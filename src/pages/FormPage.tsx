import "./FormPage.scss";
import { useState } from "react";

export const FormPage: React.FC = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newPhoto, setNewPhoto] = useState<File | null>(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  // const handleAddProduct = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   setSuccess("");
  //   setError("");

  //   if (!user) {
  //     setError("Ви повинні увійти в систему");
  //     return;
  //   }

  //   if (
  //     !newTitle.trim() ||
  //     !newDescription.trim() ||
  //     !newCity.trim() ||
  //     !newContact.trim()
  //     //!newPhoto
  //   ) {
  //     setError("Потрібно заповнити всі поля");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     const formData = new FormData();

  //     formData.append("title", newTitle);
  //     formData.append("category", newCategory);
  //     formData.append("description", newDescription);
  //     formData.append("city", newCity);
  //     formData.append("contact", newContact);
  //   //  formData.append("image", newPhoto);

  //     const res = await fetch(
  //       "https://team-project-backend-production.up.railway.app/products",
  //       {
  //         method: "POST",
  //         headers: {
          
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: formData,
  //       }
  //     );

  //     const data = await res.json();

  //     if (!res.ok) {
  //       throw new Error(data.message || "Не вдалося додати товар");
  //     }

  //     setSuccess("Товар успішно додано");

  //     setNewTitle("");
  //     setNewCategory("");
  //     setNewDescription("");
  //     setNewCity("");
  //     setNewContact("");
  //     //setNewPhoto(null);
  //   } catch (err: any) {
  //     console.error(err);
  //     setError(err.message || "Сервер не відповідає");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  


  const handleAddProduct = async (e) => {
  e.preventDefault();

  if (!user) {
    console.log("Ви повинні увійти в систему");
    return;
  }

  try {
    // 1️⃣ Fetch existing users

    const productsRes = await fetch(
      `https://team-project-backend-production.up.railway.app/products `
    );
    if (!productsRes.ok) throw new Error("Failed to fetch products");

    const products = await productsRes.json();

    // 2️⃣ Check if user already exists
    // const existingMessage = messages.find((m) => m.text === newMessageText && m.author === author);

    // if (existingMessage) {
    //   // If user exists → login without creating
    //   // setIsLoggedIn(true);
    //   setNewMessageText(''); // clear input
    console.log(products);
    //   return;
    // }

    // 3️⃣ Create new user if not found
    const createRes = await fetch(
      "https://team-project-backend-production.up.railway.app/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTitle,
          category: newCategory,
          description: newDescription,
          city: newCity,
          contact: newContact,
          
        }),
      }
    );

    // if (!createRes.ok) {
    //   throw new Error('Failed to create message');
    // }

    const createdProduct = await createRes.json();
    console.log("Created product:", createdProduct);
    //setProducts([...products, createdProduct]);
//setProducts((products) => [...products, createdProduct]);
    // 4️⃣ Log in and clear input

    setNewTitle("");
    setNewCategory("");
    setNewDescription("");
    setNewCity("");
    setNewContact("");
    
    console.log(products);
  } catch (err) {
    console.error("Error:", err);
    setError("Сервер не відповідає");

  }
};


  return (
    <div className="form__box">
      <p>
        Важливо! Додавайте лише ті товари, які ви готові віддати безкоштовно.
      </p>

      <form className="form-fields" onSubmit={handleAddProduct}>
        <div className="form-input-wrapper">
          <input
            type="text"
            className="form-input-style"
            placeholder="Назва товару"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>

        <div className="form-input-wrapper">
          <input
            type="text"
            className="form-input-style"
            placeholder="Категорія"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </div>

        <div className="form-input-wrapper">
          <input
            type="text"
            className="form-input-style"
            placeholder="Опис товару"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </div>

        <div className="form-input-wrapper">
          <input
            type="text"
            className="form-input-style"
            placeholder="Місто"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
          />
        </div>

        <div className="form-input-wrapper">
          <input
            type="text"
            className="form-input-style"
            placeholder="Контактний номер телефону"
            value={newContact}
            onChange={(e) => setNewContact(e.target.value)}
          />
        </div>

        {/* <div className="form-input-wrapper">
          <label className="form-label">
            <span className="here">Додати фото товару</span>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setNewPhoto(e.target.files[0]);
                }
              }}
            />
          </label>
        </div> */}

        {/* {newPhoto && (
          <img
            src={URL.createObjectURL(newPhoto)}
            alt="Preview"
            className="form-image-preview"
          />
        )} */}

        <button id="add" className="addButton" type="submit" disabled={loading}>
          {loading ? "Додаємо..." : "Додати товар"}
        </button>
      </form>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FormPage;

// import './FormPage.scss';
// import { useState } from 'react';
// import { setProducts } from '../features/products';
// // import { useNavigate } from 'react-router-dom';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { selectAllProducts, addProduct } from '../features/products';

// export const FormPage: React.FC = () => {
//   // const dispatch = useDispatch();
//   const [newTitle, setNewTitle] = useState('');
//   const [newDescription, setNewDescription] = useState('');
//   const [newContact, setNewContact] = useState('');
//   const [newCategory, setNewCategory] = useState('');
//   const [newCity, setNewCity] = useState('');
//   const [newPhoto, setNewPhoto] = useState<File | null>(null);
//   const [error, setError] = useState("");

//   // const allProducts = useSelector(selectAllProducts);
//   // const navigate = useNavigate();
//   // import axios from 'axios';

//   const [success, setSuccess] = useState('');
//   const [fail, setFail] = useState('');
//   const [warning, setWarning] = useState('');
//   const [_loading, setLoading] = useState(false);

// const token = localStorage.getItem("token");
// const userString = localStorage.getItem("user");
// const user = userString ? JSON.parse(userString) : null;
//   // const handleAddProduct = async (e: React.FormEvent) => {
//   //   e.preventDefault();

//   //   setFail('');
//   //   setSuccess('');
//   //   setWarning('');

//   //   if (
//   //     !newTitle.trim() ||
//   //     !newDescription.trim() ||
//   //     !newLocation.trim() ||
//   //     !newContact.trim() ||
//   //     !newPhoto
//   //   ) {
//   //     setWarning('Потрібно заповнити всі поля');
//   //     return;
//   //   }

//   //   setLoading(true);

//   //   try {
//   //     const formData = new FormData();

//   //     formData.append('title', newTitle);
//   //     formData.append('category', newCategory);
//   //     formData.append('description', newDescription);
//   //     formData.append('location', newLocation);
//   //     formData.append('contact', newContact);
//   //     formData.append('image', newPhoto);

//   //     const res = await fetch('/api/products', {
//   //       method: 'POST',
//   //       body: formData,
//   //     });

//   //     const data = await res.json();

//   //     if (res.ok) {
//   //       setSuccess('Товар успішно додано');
//   //       setNewTitle('');
//   //       setNewCategory('');
//   //       setNewDescription('');
//   //       setNewCity('');
//   //       setNewContact('');
//   //       setNewPhoto(null);
//   //     } else {
//   //       setFail(data.message || 'Товар не додано. Спробуйте ще раз');
//   //     }
//   //   } catch {
//   //     setFail('Сервер не відповідає');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

// const handleAddProduct = async (e) => {
//   e.preventDefault();

//   if (!user) {
//     console.log("Ви повинні увійти в систему");
//     return;
//   }

//   try {
//     // 1️⃣ Fetch existing users

//     const productsRes = await fetch(
//       `https://team-project-backend-production.up.railway.app/products `
//     );
//     if (!productsRes.ok) throw new Error("Failed to fetch products");

//     const products = await productsRes.json();

//     // 2️⃣ Check if user already exists
//     // const existingMessage = messages.find((m) => m.text === newMessageText && m.author === author);

//     // if (existingMessage) {
//     //   // If user exists → login without creating
//     //   // setIsLoggedIn(true);
//     //   setNewMessageText(''); // clear input
//     console.log(products);
//     //   return;
//     // }

//     // 3️⃣ Create new user if not found
//     const createRes = await fetch(
//       "https://team-project-backend-production.up.railway.app/products",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           title: newTitle,
//           category: newCategory,
//           description: newDescription,
//           city: newCity,
//           contact: newContact,
//           img: newPhoto,
//         }),
//       }
//     );

//     // if (!createRes.ok) {
//     //   throw new Error('Failed to create message');
//     // }

//     const createdProduct = await createRes.json();
//     console.log("Created product:", createdProduct);
//     setProducts([...products, createdProduct]);
// //setProducts((products) => [...products, createdProduct]);
//     // 4️⃣ Log in and clear input

//     setNewTitle("");
//     setNewCategory("");
//     setNewDescription("");
//     setNewCity("");
//     setNewContact("");
//     setNewPhoto(null);
//     console.log(products);
//   } catch (err) {
//     console.error("Error:", err);
//     setError("Сервер не відповідає");

//   }
// };

//   return (
//     <div className="form__box">
//       <p>
//         Важливо! Додавайте лише ті товари, які ви готові віддати безкоштовно.
//       </p>
//       <form className="form-fields" onSubmit={handleAddProduct}>
//         <div className="form-input-wrapper">
//           <input
//             type="text"
//             className="form-input-style"
//             placeholder="Назва товару"
//             value={newTitle}
//             onChange={e => setNewTitle(e.target.value)}
//           />
//         </div>

//         <div className="form-input-wrapper">
//           <input
//             type="text"
//             className="form-input-style"
//             placeholder="Категорія"
//             value={newCategory}
//             onChange={e => setNewCategory(e.target.value)}
//           />
//         </div>

//         <div className="form-input-wrapper">
//           <input
//             type="text"
//             className="form-input-style"
//             placeholder="Опис товару"
//             value={newDescription}
//             onChange={e => setNewDescription(e.target.value)}
//           />
//         </div>

//         <div className="form-input-wrapper">
//           <input
//             type="text"
//             className="form-input-style"
//             placeholder="Місто"
//             value={newCity}
//             onChange={e => setNewCity(e.target.value)}
//           />
//         </div>

//         <div className="form-input-wrapper">
//           <input
//             type="text"
//             className="form-input-style"
//             placeholder="Контактний номер телефону"
//             value={newContact}
//             onChange={e => setNewContact(e.target.value)}
//           />
//         </div>

//         <div className="form-input-wrapper">
//           <label className="form-label">
//            <span className="here">Додати фото товару</span>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={e => {
//                 if (e.target.files && e.target.files[0]) {
//                   setNewPhoto(e.target.files[0]);
//                 }
//               }}
//               hidden
//             />
//           </label>
//         </div>

//         {/* Preview */}
//         {newPhoto && (
//           <img
//             src={URL.createObjectURL(newPhoto)}
//             alt="Preview"
//             className="form-image-preview"
//           />
//         )}

//         {/* <div className="form__buttons"> */}
//           <button id="add" className="addButton" type="submit" >
//             Додати товар
//           </button>
//           {/* <button id="back" className="addButton" onClick={() => navigate('/')}>
//             На головну
//           </button>
//         </div> */}
//       </form>

//       {success && (
//         <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>
//       )}

//       {fail && <p style={{ color: 'red', marginTop: '10px' }}>{fail}</p>}

//       {warning && (
//         <p style={{ color: 'orange', marginTop: '10px' }}>{warning}</p>
//       )}
//     </div>
//   );
// };

// export default FormPage;
