"use client";

import Header from "@/components/dasboard/Header";
import { useState, useEffect } from "react";
import Image from "next/image";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";
import $ from "jquery";
import "select2/dist/css/select2.css";
import CreatableSelect from "react-select/creatable";
import { useTranslation } from "@/app/context/TranslationContext";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { POST } from "@/app/utils/api/post";
import { showErrorToast, showSuccessToast } from "@/app/utils/tost";
import { ToastContainer } from "react-toastify";

export default function Profile() {
  const { user } = useAuthContext();
  const { translate } = useTranslation();
  const [userData, setUserData] = useState({});

  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [image1, setImage1] = useState(""); 
  const [imagePreview, setImagePreview] = useState(""); 
  const [image2, setImage2] = useState([]); 
  const [SelectedCountry, setSelectedCountry] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [info, setInfo] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [website, setWebsite] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [tax_number, setTaxNumber] = useState("");
  const [type, setType] = useState("");
  const [bank_name, setBankName] = useState("");
  const [owner_name, setOwnerName] = useState("");
  const [IBAN, setIBAN] = useState("");
  const [companyData, setCompanyData] = useState({});
  const [old_password, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [fileBlob,setFileBlob] = useState({});
  const [uploadImage, setUploadImage] = useState([]);
  useEffect(() => {
    if (user) {

      fetchProfile();
    }
  }, [])


  const fetchProfile = async () => {
    const url = 'my_profile'
    const response = await POST.request({ url: url, token: `${user?.authorisation.token}` });
    console.log(response.user.country,"userdata")
    if (response.user) {
      setUserData(response.user)
      setName(response.user.name);
      setSurname(response.user.surname);
      setCompanyName(response.user.company.companyName);
      setEmail(response.user.email);
      setMobile(response.user.mobile);
      setCity(response.user.city);
      setStreet(response.user.street);
      setHouseNumber(response.user.houseNumber);
      setZipcode(response.user.plz);
      setWebsite(response.user.company.Link);
      setTaxNumber(response.user.company.tax_number);
      setInfo(response.user.company.info);
      setCompanyData(response.user.company)
      if(response.user.country !== null && response.user.country !== ""){

        setSelectedCountry({ value: response.user.country, label: response.user.country });
      }
      if(response.user.company.company_document){
        
        setImage2(response.user.company.company_document);
  
      }
      setImage1(response.user.company.image);
      setFileBlob(response.user.company.image);
      setBankName(response.user.company.bankName);
      setOwnerName(response.user.company.account_owner);
      setIBAN(response.user.company.bankIban);
    }
  }
 
 
  const handleImageChange1 = (e) => {
      const file = e.target.files[0];
      const allowedType = ['image/jpeg', 'image/x-png', 'image/png'];
      if (file && allowedType.includes(file?.type)) {
        setImage1(file);
        const blobUrl = URL.createObjectURL(file);
        setFileBlob(blobUrl);
      }
    
   
    // const file = e.target.files[0];
    // const allowedType = ['image/jpeg', 'image/x-png', 'image/png'];
    // if (file && allowedType.includes(file?.type)) {
        
    //     setImage1(file);
    //     setFileBlob(URL.createObjectURL(file));
    // }

    console.log(image1,"image1")
    console.log(fileBlob,"fileBlob")
  };

  
  // const handleImageChange1 = (e) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     const promise = new Promise((resolve) => {
  //       reader.onloadend = () => {
  //         const imageData = reader.result;
  //         if (!imageData.startsWith('data:image/')) {
  //           console.error('Invalid image format');
  //           return;
  //         }
  //         const imageFile = new File([imageData], file.name, { type: 'image/jpeg' });
  //         const blob = dataURItoFile(imageData, file.name);
  //         setFileBlob(blob);
  //         console.log(blob,"fileBlob")
  //         setImage1(blob)
  //         resolve(imageFile);
  //       };
  //       reader.readAsDataURL(file);
  //     });
  //     promise.then((imageSrc) => {
  //       setImage1(imageSrc);
  //       setFileBlob(file);
  //       console.log(fileBlob,"image1")
  //     });
  //   }
    
  // };
  
  const handleImageChange2 = (event) => {
    const files = event.target.files;
    const promises = [];
    const newUploadedImages = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const promise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageData = reader.result;
          const fileExtension = file.name.split('.').pop().toLowerCase();
          const isDocument = ['docx', 'pdf'].includes(fileExtension);
          const fileName = isDocument ? file.name : null;
  
          newUploadedImages.push({ image: imageData, fileName });

          resolve();
        };
        reader.readAsDataURL(file);
      });
      promises.push(promise);
    }
  
    Promise.all(promises).then(() => {
      const updatedImages = [ ...newUploadedImages];
      setUploadImage(updatedImages);
    });
  };
  // const dataURItoFile = (dataURI, fileName) => {
  //   const byteString = atob(dataURI.split(',')[1]);
  //   const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  //   const ab = new ArrayBuffer(byteString.length);
  //   for (let i = 0; i < byteString.length; i++) {
  //     ab[i] = byteString.charCodeAt(i);
  //   }
  //   const file = new Blob([ab], { type: mimeString });
  //   file.name = fileName;
  //   return file;
  // };
    
  // const getFileNameFromBase64 = (base64String) => {
  //   const decodedString = atob(base64String);
  //   const fileNameRegex = /filename="(.*)"/;
  //   const match = decodedString.match(fileNameRegex);
  //   return match ? match[1] : null;
  // };
  const handleSubmit = async (e) => {

    e.preventDefault();
   
    // if(!confirm_password || !password || !old_password || !IBAN || !owner_name || !bank_name || !info || !tax_number || !website || !zipcode || !houseNumber || !street || !city || !SelectedCountry || !mobile || !email || !surname || !name || !companyName || image1 == "" || image2.length == 0){
    //   showErrorToast("Please fill all fields")
    // }

    const formData = new FormData();
    const formType = e.target.name;

    const image2File = document.querySelector('input[name="image2"]').files;
    console.log(image2File,"image2File")
    const image2FileArray = Object.entries(image2File).map(([key, value]) => value);
    console.log(image2FileArray)
    switch (formType) {
      case 'profile':
        formData.append('id', user?.user.id);
        formData.append('name', name);
        formData.append('surname',  surname);
        formData.append('email',  email);
        formData.append('mobile',  mobile);
        formData.append('country',  SelectedCountry?.value);
        formData.append('city',  city);
        formData.append('street',  street);
        formData.append('houseNumber',  houseNumber);
        formData.append('zipcode',  zipcode);
        formData.append('website',  website);
        formData.append('tax_number', tax_number);
        formData.append('image', image1);
      
        formData.append('companyName',  companyName);
        formData.append('info',  info);
        formData.append('company_id', userData?.company === "{}" || userData?.company === null ? 0 : userData?.company.id);
        formData.append('type', formType);
        image2FileArray.forEach((file, index) => {
          formData.append(`company_document[${index}]`, file);
        });
        break;
      case 'bank_details':
        formData.append('id', user?.user.id);
        formData.append('company_id', userData.company === "{}" || userData.company === null ? 0 : userData?.company.id);
        formData.append('type', formType);
        formData.append('bankName', bank_name);
        formData.append('account_owner', owner_name);
        formData.append('bankIban', IBAN);
        break;
      case 'change_password':
        formData.append('id', user?.user.id);
        formData.append('company_id', userData.company === "{}" || userData.company === null ? 0 : userData?.company.id);
        formData.append('type', formType);
        formData.append('old_password', old_password);
        formData.append('password', password);
        break;
      default:
        console.log('Invalid form type');
        return;
    }

    if (formType === 'profile') {
      // || ( !userData.mobile && !mobile) ||  ( !userData.city && !city ) || (!userData.street && !street ) || (!userData.houseNumber && !houseNumber) || ( !userData.plz && !zipcode ) || ( !userData.company.Link && !website) || ( !userData.tax_number && !tax_number ) || ( !userData.company.info && !info )  || ( !userData.company.companyName && !companyName ) 
      console.log(name,userData.name ,userData.surname, surname,userData.email, email,userData.mobile, mobile, SelectedCountry, userData.country,userData.street,userData.city,userData.houseNumber,userData.plz, city, street, houseNumber, zipcode,userData.company.Link, website,userData.company.tax_number, tax_number, info,userData.company.companyName, companyName, image1, image2File)
      // if(( !userData.name && !name ) || !surname || ( !userData.email && !email ) || ( !userData.mobile && !mobile) ||  ( !userData.city && !city )|| (!userData.street && !street ) || (!userData.houseNumber && !houseNumber) || ( !userData.plz && !zipcode ) || ( !companyData.Link && !website) || ( !companyData.tax_number && !tax_number ) || ( !companyData.info && !info )  || ( !companyData.companyName && !companyName ) || !image1 || image2File.length == 0){
      //   showErrorToast("Please fill all fields")
      //   return;
      // } 
      // else {
        const url = `update_profile`
        console.log(name)
        const response = await POST.request({ form: formData, url: url, header: { 'Content-Type': 'multipart/form-data', } });
    
        if (response) {
          showSuccessToast(response.message);
          setUploadImage([]);
          fetchProfile();
        }else{
          showErrorToast(response.message);
        }
      // }
    }else if (formType === 'bank_details') {
      if((!bank_name) || ( !owner_name) || ( !IBAN)){
        showErrorToast("Please fill all fields")
      }else{
        const url = `update_profile`
        const response = await POST.request({ form: formData, url: url, header: { 'Content-Type': 'multipart/form-data', } });
    
        if (response) {
          showSuccessToast(response.message);
          fetchProfile();
        }else{
          showErrorToast(response.message);
        }
      }

    }else if (formType === 'change_password') {
      if(!old_password || !password || !confirm_password){
        showErrorToast("Please fill all fields")
      }else{
        const url = `update_profile`
        const response = await POST.request({ form: formData, url: url, header: { 'Content-Type': 'multipart/form-data', } });
    
        if (response) {
          showSuccessToast(response.message);
          fetchProfile();
        }else{
          showErrorToast(response.message);
        }
      }
    }

   


  }

  const CountryOptions = [
    { value: "India", label: "India" },
    { value: "Algeria", label: "Algeria" },
    { value: "Afghanistan", label: "Afghanistan" },
  ];

  const HandleCountryChange = (newValue, actionMeta) => {
    setSelectedCountry(newValue);
    console.log(newValue);
  };


  const handleInputChange = (setter) => (e) => {
    const { value } = e.target;
    setter(value);


  };

  const handleDeleteImage1 = () => {
    setImage1("");
    setFileBlob({});
  };

  const handleDeleteImage2 = (index) => {
    const newImages = [...image2];
    newImages.splice(index, 1);
    setImage2(newImages);
  };


  useEffect(() => {
    if (typeof window !== "undefined") {
      // Indicate that the component has mounted
      // setMounted(true);

      const handleResize = () => {
        if (window.innerWidth >= 1000) {
          setSideBarOpen(true);
        } else {
          setSideBarOpen(false);
        }
      };

      // Set the initial state based on the screen size
      handleResize();

      // Add event listener to update state on resize
      window.addEventListener("resize", handleResize);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  

  const handlePassword = (e) => {
    setConfirmPassword(e.target.value)
    if(e.target.value !== password){
      setError("Password does not match")
    }else{
      setError("")
    }
  }


  return (
    <>
      <ToastContainer />
      <div
        className={`dashboard ${sideBarOpen ? "-is-sidebar-visible" : ""
          } js-dashboard`}
      >
        <AgentDBsideBar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">

            <h1 className="text-30"> {translate("My Profile")}</h1>
            <div className="mt-20 rounded-12 bg-white shadow-2 px-40 py-40">
              <h5 className="text-20 fw-500 mb-30"> {translate("Profile Details")}</h5>
              <form
                className=" d-flex flex-column w-100"
                noValidate
                onSubmit={handleSubmit}
                name="profile"
              >
                <div className="contactForm row my-1">
                  <div className="col-md-6">
                    <div className="form-input m-0 ">
                      <input
                        type="text"
                        required
                        defaultValue={ name}
                        onChange={handleInputChange(setName)}
                      />
                      <label className="lh-1 text-16 text-light-1">
                        {translate("First Name")} <span className="text-red">*</span>
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-input m-0">
                      <input type="text" required defaultValue={ surname} onChange={handleInputChange(setSurname)} />
                      <label className="lh-1 text-16 text-light-1">
                        {translate("Last Name")} <span className="text-red">*</span>
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-input m-0">
                      <input type="text" required defaultValue={ companyName} onChange={handleInputChange(setCompanyName)} />
                      <label className="lh-1 text-16 text-light-1">
                        {translate("Company Name")} <span className="text-red">*</span>
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-input m-0">
                      <input type="email" required defaultValue={ email} onChange={handleInputChange(setEmail)} />
                      <label className="lh-1 text-16 text-light-1">
                        {translate("Email Id")} <span className="text-red">*</span>
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-input m-0">
                      <input type="text" required defaultValue={ mobile} onChange={handleInputChange(setMobile)} />
                      <label className="lh-1 text-16 text-light-1">
                        {translate("Contact No")} <span className="text-red">*</span>
                      </label>
                    </div>
                  </div>

                  {/* change dropdown  */}

                  <div className="col-md-6">
                    <div className="form-input my-1 d-flex flex-column align-items-center add-tour-type">
                      <CreatableSelect
      value={SelectedCountry}
      onChange={HandleCountryChange}                        options={CountryOptions}
                        className="custom-select"
                        placeholder="Select Country(required) "
                        classNamePrefix="react-select"
                        isClearable
                        formatCreateLabel={(inputValue) =>
                          `Create custom gender: "${inputValue}"`
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-input m-0">
                      <input type="text" required defaultValue={ city} onChange={handleInputChange(setCity)} />
                      <label className="lh-1 text-16 text-light-1"> {translate("City")} <span className="text-red">*</span></label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-input m-0">
                      <input type="text" required defaultValue={street} onChange={handleInputChange(setStreet)} />
                      <label className="lh-1 text-16 text-light-1"> {translate("Street")} <span className="text-red">*</span></label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-input m-0">
                      <input type="text" required defaultValue={ houseNumber} onChange={handleInputChange(setHouseNumber)} />
                      <label className="lh-1 text-16 text-light-1">
                        {translate("House No")} <span className="text-red">*</span>
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-input m-0">
                      <input type="text" required defaultValue={zipcode} onChange={handleInputChange(setZipcode)} />
                      <label className="lh-1 text-16 text-light-1">
                        {translate("ZIP Code")} <span className="text-red">*</span>
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-input m-0">
                      <input type="text" required defaultValue={ website} onChange={handleInputChange(setWebsite)} />
                      <label className="lh-1 text-16 text-light-1"> {translate("Website")} <span className="text-red">*</span></label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-input m-0 ">
                      <input type="text" required defaultValue={tax_number} onChange={handleInputChange(setTaxNumber)} />
                      <label className="lh-1 text-16 text-light-1">
                        {translate("Tax Number")} <span className="text-red">*</span>
                      </label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-input m-0">
                      <textarea required rows="2" defaultValue={ info} onChange={handleInputChange(setInfo)}></textarea>
                      <label className="lh-1 text-16 text-light-1"> {translate("Info")} <span className="text-red">*</span></label>
                    </div>
                  </div>

                  <div className="col-12">
                    <h4 className="text-18 fw-500 mb-20"> {translate("Company Logo")} <span className="text-red">*</span></h4>
                    <div className="row x-gap-20 y-gap my-1">
                      {image1 ? (
                        <div className="col-auto">
                          <div className="relative">
                            <Image
                              width={200}
                              height={200}
                              src={fileBlob}
                              alt="image"
                              className="size-200 rounded-12 object-cover"
                            />
                            <button
                              onClick={handleDeleteImage1}
                              className="absoluteIcon1 button -dark-1"
                            >
                              <i className="icon-delete text-18"></i>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="col-auto">
                          <label
                            htmlFor="imageInp1"
                            className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                          >
                            <Image
                              width="40"
                              height="40"
                              alt="image"
                              src={"/img/dashboard/upload.svg"}
                            />

                            <div className="text-16 fw-500 text-accent-1 mt-10">
                              {translate("Upload Image")}
                            </div>
                          </label>
                          <input
                            onChange={handleImageChange1}
                            accept="image/*"
                            id="imageInp1"
                            type="file"
                            name="image1"
                            style={{ display: "none" }}
                          />
                        </div>
                      )}
                    </div>

                    <h4 className="text-18 fw-500 mb-20 mt-20"> {translate("Documents")} <span className="text-red">*</span></h4>
                    <div className="row x-gap-20 y-gap">
                      {/* {image1 ? (
                      <div className="col-auto">
                        <div className="relative">
                          <Image
                            width={200}
                            height={200}
                            src={image1}
                            alt="image"
                            className="size-200 rounded-12 object-cover"
                          />
                          <button
                            onClick={() => {
                              setImage1("");
                            }}
                            className="absoluteIcon1 button -dark-1"
                          >
                            <i className="icon-delete text-18"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="col-auto my-2">
                        <label
                          htmlFor="imageInp1"
                          className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                        >
                          <Image
                            width="40"
                            height="40"
                            alt="image"
                            src={"/img/dashboard/upload.svg"}
                          />

                          <div className="text-16 fw-500 text-accent-1 mt-10">
                             {translate("Upload Images") }
                          </div>
                        </label>
                        <input
                          onChange={(e) => handleImageChange(e, setImage1)}
                          accept="image/*"
                          id="imageInp1"
                          type="file"
                          style={{ display: "none" }}
                        />
                      </div>
                    )} */}

                    {
                      companyData.company_document ? companyData.company_document.map((document, index) => {
                        const isImage = document.endsWith('.jpg') || document.endsWith('.jpeg') || document.endsWith('.png');
                        const isDocument = document.endsWith('.pdf') || document.endsWith('.docx');

                        if (isImage) {
                          return (
                            <div className="col-auto my-2" key={index}>
                              <div className="relative">
                                <Image
                                  width={200}
                                  height={200}
                                  src={document}
                                  alt={`image-${index}`}
                                  className="size-200 rounded-12 object-cover"
                                />
                                <button
                                  onClick={() => handleDeleteImage2(index)}
                                  className="absoluteIcon1 button -dark-1"
                                >
                                  <i className="icon-delete text-18"></i>
                                </button>
                              </div>
                            </div>
                          );
                        } else if (isDocument) {
                          return (
                            <div className="col-auto my-2" key={index}>
                              <div className="relative">
                                <div
                                  className="size-200 rounded-12 border-1 bg-white flex-center flex-column"
                                >
                                  <Image
                                    width="40"
                                    height="40"
                                    alt="image"
                                    src={"/img/dashboard/upload.svg"}
                                  />

                                  
                                </div>
                                <div className="file-name">{document.split('/').pop()}</div>
                                <button
                                  onClick={() => handleDeleteImage2(index)}
                                  className="absoluteIcon1 button -dark-1"
                                >
                                  <i className="icon-delete text-18"></i>
                                </button>
                              </div>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      }) :

                      image2.map((image, index) => {
  // const fileExtension = image.split(';')[0].split('/')[1].toLowerCase();
                        const isImage = image.image.startsWith('data:image/');
                        //  const isDocument = ['docx', 'pdf'].includes(fileExtension);
                        const isDocument = image.image.startsWith('data:application/');
                        
                        //  const fileName = isDocument ? getFileNameFromBase64(image) : null;
                         console.log(isDocument,"isImage")

                         return (
                          <div className="col-auto my-2" key={index}>
      {isImage ? (
        <div className="relative">
          <Image
            width={200}
            height={200}
            src={image.image}
            alt={`image-${index}`}
            className="size-200 rounded-12 object-cover"
          />
          <button
            onClick={() => handleDeleteImage2(index)}
            className="absoluteIcon1 button -dark-1"
          >
            <i className="icon-delete text-18"></i>
          </button>
        </div>
      ) : isDocument ? (
        <div className="relative">
          <div
                          className="size-200 rounded-12 border-1 bg-white flex-center flex-column"
                        >
                          <Image
                            width="40"
                            height="40"
                            alt="image"
                            src={"/img/dashboard/upload.svg"}
                          />

                          
                        </div>
          <div className="file-name">{image.fileName}</div>
          <button
            onClick={() => handleDeleteImage2(index)}
            className="absoluteIcon1 button -dark-1"
          >
            <i className="icon-delete text-18"></i>
          </button>
        </div>
      ) : null}
    </div>
                         );
                      })

                    }

                    {
                      uploadImage && uploadImage.map((image, index) => {
                        const isImage = image.image.startsWith('data:image/');
                        //  const isDocument = ['docx', 'pdf'].includes(fileExtension);
                        const isDocument = image.image.startsWith('data:application/');
                        
                        //  const fileName = isDocument ? getFileNameFromBase64(image) : null;
                         console.log(isDocument,"isImage")

                         return (
                          <div className="col-auto my-2" key={index}>
      {isImage ? (
        <div className="relative">
          <Image
            width={200}
            height={200}
            src={image.image}
            alt={`image-${index}`}
            className="size-200 rounded-12 object-cover"
          />
          <button
            onClick={() => handleDeleteImage2(index)}
            className="absoluteIcon1 button -dark-1"
          >
            <i className="icon-delete text-18"></i>
          </button>
        </div>
      ) : isDocument ? (
        <div className="relative">
          <div
                          className="size-200 rounded-12 border-1 bg-white flex-center flex-column"
                        >
                          <Image
                            width="40"
                            height="40"
                            alt="image"
                            src={"/img/dashboard/upload.svg"}
                          />

                          
                        </div>
          <div className="file-name">{image.fileName}</div>
          <button
            onClick={() => handleDeleteImage2(index)}
            className="absoluteIcon1 button -dark-1"
          >
            <i className="icon-delete text-18"></i>
          </button>
        </div>
      ) : null}
    </div>
                         )
                      })
                    }

                      <div className="col-auto my-2">
                        <label
                          htmlFor="imageInp2"
                          className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                        >
                          <Image
                            width="40"
                            height="40"
                            alt="image"
                            src={"/img/dashboard/upload.svg"}
                          />

                          <div className="text-16 fw-500 text-accent-1 mt-10">
                            {translate("Upload Images")}
                          </div>
                        </label>
                        <input
                          onChange={handleImageChange2}
                          accept=".pdf, .png, .jpg, .doc"
                          id="imageInp2"
                          type="file"
                          name="image2"
                          multiple
                          style={{ display: "none" }}
                        />
                      </div>
                     
                    </div>


                    <div className="text-14 mt-20">
                      PDF or PNG or JPG or DOC no bigger than 800px wide and tall.
                    </div>

                    <button className="button -md -info-2 bg-accent-1 text-white mt-30" type="submit">
                      {translate("Save Changes")}
                      {/* <i className="icon-arrow-top-right text-16 ml-10"></i> */}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 mt-30">
              <h5 className="text-20 fw-500 mb-30">  {translate("Payout Account (IBAN)")}</h5>
              <form
                className=" d-flex flex-column w-100"
                noValidate
                onSubmit={handleSubmit}
                name="bank_details"
              >
                <div className="contactForm ">

                  <div className="row ">
                    <div className="col-md-6">
                      <div className="form-input my-1 ">
                        <input type="text" required defaultValue={ bank_name} onChange={handleInputChange(setBankName)} />
                        <label className="lh-1 text-16 text-light-1">
                          {translate("Bank Name")} <span className="text-red">*</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-md-6">
                      <div className="form-input my-1 ">
                        <input type="text" required defaultValue={ owner_name} onChange={handleInputChange(setOwnerName)} />
                        <label className="lh-1 te xt-16 text-light-1">
                          {translate("Owner Name")} <span className="text-red">*</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-input my-1 ">
                        <input type="text" required defaultValue={ IBAN} onChange={handleInputChange(setIBAN)} />
                        <label className="lh-1 text-16 text-light-1"> {translate("IBAN")} <span className="text-red">*</span></label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <button className="button -md -info-2 bg-accent-1 text-white mt-15">
                        {translate("Save Changes")}
                        {/* <i className="icon-arrow-top-right text-16 ml-10"></i> */}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 mt-30">
              <h5 className="text-20 fw-500 mb-30"> {translate("Change Password")}</h5>
              <form
                className=" d-flex flex-column w-100"
                noValidate
                onSubmit={handleSubmit}
                name="change_password"
              >
                <div className="contactForm ">
                  <div className="row my-1">
                    <div className="col-md-6">
                      <div className="form-input m-0 ">
                        <input type="password" required value={old_password} onChange={handleInputChange(setOldPassword)}/>
                        <label className="lh-1 text-16 text-light-1">
                          {translate("Old password")} <span className="text-red">*</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row my-1">
                    <div className="col-md-6">
                      <div className="form-input m-0 ">
                        <input type="password" required value={password} onChange={handleInputChange(setPassword)} />
                        <label className="lh-1 text-16 text-light-1">
                          {translate("New password")} <span className="text-red">*</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-input m-0 ">
                        <input type="password" required value={confirm_password} onChange={handlePassword} />
                        <label className="lh-1 text-16 text-light-1">
                          {translate("Confirm new password")} <span className="text-red">*</span>
                        </label>
                        {error && <div className="text-red">{error}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <button className="button -md -info-2 bg-accent-1 text-white">
                        {translate("Save Changes")}
                        {/* <i className="icon-arrow-top-right text-16 ml-10"></i> */}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>


            <div className="text-center pt-30">
              © Copyright MekkaBooking.com {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
