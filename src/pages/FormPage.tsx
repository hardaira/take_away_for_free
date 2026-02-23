import './FormPage.scss';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectAllProducts, addProduct } from '../features/products';

export const FormPage: React.FC = () => {
  // const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newPhoto, setNewPhoto] = useState<File | null>(null);

  // const allProducts = useSelector(selectAllProducts);
  // const navigate = useNavigate();
  // import axios from 'axios';

  const [success, setSuccess] = useState('');
  const [fail, setFail] = useState('');
  const [warning, setWarning] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    setFail('');
    setSuccess('');
    setWarning('');

    if (
      !newTitle.trim() ||
      !newDescription.trim() ||
      !newLocation.trim() ||
      !newContact.trim() ||
      !newPhoto
    ) {
      setWarning('Потрібно заповнити всі поля');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('title', newTitle);
      formData.append('category', newCategory);
      formData.append('description', newDescription);
      formData.append('location', newLocation);
      formData.append('contact', newContact);
      formData.append('image', newPhoto);

      const res = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Товар успішно додано');
        setNewTitle('');
        setNewCategory('');
        setNewDescription('');
        setNewLocation('');
        setNewContact('');
        setNewPhoto(null);
      } else {
        setFail(data.message || 'Товар не додано. Спробуйте ще раз');
      }
    } catch {
      setFail('Сервер не відповідає');
    } finally {
      setLoading(false);
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
            onChange={e => setNewTitle(e.target.value)}
          />
        </div>

        <div className="form-input-wrapper">
          <input
            type="text"
            className="form-input-style"
            placeholder="Категорія"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
          />
        </div>

        <div className="form-input-wrapper">
          <input
            type="text"
            className="form-input-style"
            placeholder="Опис товару"
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
          />
        </div>

        <div className="form-input-wrapper">
          <input
            type="text"
            className="form-input-style"
            placeholder="Місто"
            value={newLocation}
            onChange={e => setNewLocation(e.target.value)}
          />
        </div>

        <div className="form-input-wrapper">
          <input
            type="text"
            className="form-input-style"
            placeholder="Контактний номер телефону"
            value={newContact}
            onChange={e => setNewContact(e.target.value)}
          />
        </div>

        <div className="form-input-wrapper">
          <label className="form-label">
            Натисніть <span className="here">тут</span>, щоб додати фото товарy
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  setNewPhoto(e.target.files[0]);
                }
              }}
              hidden
            />
          </label>
        </div>

        {/* Preview */}
        {newPhoto && (
          <img
            src={URL.createObjectURL(newPhoto)}
            alt="Preview"
            className="form-image-preview"
          />
        )}

        {/* <div className="form__buttons"> */}
          <button id="add" className="addButton" type="submit">
            Додати товар
          </button>
          {/* <button id="back" className="addButton" onClick={() => navigate('/')}>
            На головну
          </button>
        </div> */}
      </form>

      {success && (
        <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>
      )}

      {fail && <p style={{ color: 'red', marginTop: '10px' }}>{fail}</p>}

      {warning && (
        <p style={{ color: 'orange', marginTop: '10px' }}>{warning}</p>
      )}
    </div>
  );
};

export default FormPage;
