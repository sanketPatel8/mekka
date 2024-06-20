"use client"

// import Form from '@/components/pages/uiElements/Form'
import { React , useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import '@/public/css/index.css'

const page = () => {
  const [gender, setGender] = useState(null);
  const [customGender, setCustomGender] = useState('');

  const options = [
    { value: '99955', label: '99955' },
    { value: '37139', label: '37139' },
    { value: '29528', label: '29528' },
    { value: '21365', label: '21365' },
    { value: '27257', label: '27257' },
  ];

  const handleGenderChange = (newValue, actionMeta) => {
    if (actionMeta.action === 'create-option') {
      setCustomGender(newValue.value);
    } else {
      setCustomGender('');
    }
    setGender(newValue);
  };

  return (
    <div>
        {/* <Form /> */}
        <div className="col-md-6">
          <div className="form-input spacing">
            <CreatableSelect
            className="custom-select"
              value={gender}
              onChange={handleGenderChange}
              options={options}
              placeholder="Select or create Gender"
              classNamePrefix="react-select"
              isClearable
              formatCreateLabel={(inputValue) => `Create custom gender: "${inputValue}"`}
            />
            {gender && gender.__isNew__ && (
              <input
                type="text"
                value={customGender}
                onChange={(e) => setCustomGender(e.target.value)}
                placeholder="Enter custom gender"
                className="form-control mt-2 custom-input"
              />
            )}
          </div>
        </div>
    </div>
  )
}

export default page