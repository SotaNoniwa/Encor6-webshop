"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";

export type ImageType = {
  color: string;
  colorCode: string;
  imageFile: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  imageUrl: string;
};

const AddProductForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, SetIsProductCreated] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      SetIsProductCreated(false);
    }
  }, [isProductCreated]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Product data", data);

    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("カテゴリーが選択されていません");
    }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("画像が選択されていません");
    }

    const handleImageUploads = async () => {
      toast("商品を登録中です。少々お待ちください...");

      try {
        for (const item of data.images) {
          if (item.imageFile) {
            const fileName = new Date().getTime() + "-" + item.imageFile.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.imageFile);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  // Handle unsuccessful uploads
                  console.log("Error uploading image", error);
                  reject(error);
                },
                () => {
                  // Handle successful uploads on complete
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      // Destructure to exclude imageFile field as we don't store it to db
                      const { imageFile, ...rest } = item;
                      uploadedImages.push({
                        ...rest,
                        imageUrl: downloadURL,
                      });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      console.log("Error getting the download URL", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error handling image uploads", error);
        return toast.error("画像のアップロードに失敗しました");
      }
    };

    await handleImageUploads();
    const priceInNumDataType = parseFloat(data.price);

    // create record for each color (one product may have multiple colors)
    uploadedImages.map((image) => {
      const productData = {
        ...data,
        price: priceInNumDataType,
        image: image,
      };

      axios
        .post("/api/product", productData)
        .then(() => {
          toast.success(
            `${data.name}(${productData.image.color})が登録されました`
          );
          SetIsProductCreated(true);
          router.refresh();
        })
        .catch((error) => {
          toast.error("商品をdbに登録する際に不具合が生じました");
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }

      return [...prev, value];
    });
  }, []);

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }
    });
  }, []);

  return (
    <>
      <Heading title="商品を追加する" center />
      <Input
        id="name"
        label="商品名"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="価格"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="number"
      />
      <TextArea
        id="description"
        label="商品の説明文"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckBox id="inStock" register={register} label="在庫あり" />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto gap-3">
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }

            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                  color={item.color}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap gap-4">
        <div className="font-bold">
          商品の色を選び、その画像をアップロードしてください。
        </div>
        <div className="text-sm">
          複数の色がある場合はそれぞれの色の商品画像をアップロードしてください。
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
      </div>
      <Button
        label={isLoading ? "ローディング..." : "商品を追加する"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
