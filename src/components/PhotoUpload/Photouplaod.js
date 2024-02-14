import React, { useEffect, useState } from "react";
import { storage } from "../../firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import styles from "./photoupload.module.css";

function Photouplaod() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListref = ref(storage, "images/");
  const uploadImage = () => {
    if (imageUpload == null) {
      return;
    }
    const imageref = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageref, imageUpload).then(() => {
      alert("Images uploaded");
    });
  };
  useEffect(() => {
    listAll(imageListref)
      .then(async (res) => {
        const urls = [];
        for (const itemRef of res.items) {
          const url = await getDownloadURL(itemRef);
          urls.push(url);
        }
        setImageList(urls.reverse());
      })
      .catch((error) => {
        console.error("Error listing images:", error);
      });
  }, []);

  return (
    <div>
        <div className={styles.container}>
          <h1 className={styles.heading}>PhotoGallery</h1>
        </div>
        <div className={styles.container}>
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
            className={styles.input_field}
          />
          <button onClick={uploadImage} className={styles.button}>
            Upload Image
          </button>
      </div>
      <div className={styles["image-container"]}>
        {imageList.map((url, index) => (
          <div className={styles["image-item"]} key={index}>
            <img src={url} alt={`Image ${index}`} className={styles.photo} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photouplaod;
