"use client";

import Header from "@/components/dasboard/Header";
import { useState , useEffect } from "react";
import Image from "next/image";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";
import $ from "jquery";
import "select2/dist/css/select2.css";
import CreatableSelect from "react-select/creatable";
import { useTranslation } from "@/app/context/TranslationContext";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { POST } from "@/app/utils/api/post";

export default function Profile() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [image1, setImage1] = useState(""); //company logo
  const [image2, setImage2] = useState([]); //documents
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
  const [tax_number, setTaxNumber] = useState("");
  const [type, setType] = useState("");
  const [bank_name, setBankName] = useState("");
  const [owner_name, setOwnerName] = useState("");
  const [IBAN, setIBAN] = useState("");
  const {user} = useAuthContext();

  // const handleImageChange = (event, func) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       func(reader.result);
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage1(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageChange2 = (event) => {
    const files = event.target.files;
    const newImages = [...image2];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`Reading file ${i + 1} of ${files.length}`);
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(`File ${i + 1} read successfully`);

        newImages.push(reader.result);
        console.log(newImages,"new images")
        setImage2(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async(e) =>{

    e.preventDefault();
    const formData = new FormData();
    console.log(image1,"image1")
    console.log(image2,"image2")
    // Determine the type of form being submitted
    const formType = e.target.name;
    console.log(formType)
    switch (formType) {
      case 'profile':
        formData.append('id', user?.user.id);
        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('country', SelectedCountry);
        formData.append('city', city);
        formData.append('street', street);
        formData.append('houseNumber', houseNumber);
        formData.append('zipcode', zipcode);
        formData.append('website', website);
        formData.append('tax_number', tax_number);
        formData.append('image', image1);
        formData.append('company_document', image2);
        break;
      case 'bank_details':
        formData.append('id', user?.user.id);
        formData.append('bank_name', bank_name);
        formData.append('owner_name', owner_name);
        formData.append('iban', IBAN);
        break;
      case 'change_password':
        formData.append('id', user?.user.id);
        formData.append('old_password', old_password);
        formData.append('new_password', new_password);
        formData.append('confirm_new_password', confirm_new_password);
        break;
      default:
        console.log('Invalid form type');
        return;
    }
    
    console.log(formData.append,"formData")
    const url = `update_profile`

      const response = await POST.request({form: formData, url:url,header: { 'Content-Type': 'multipart/form-data', }, token: `${user.authorisation.token}` });

      console.log(response.data);
   

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

  const { translate } = useTranslation();

  return (
    <>
      <div
        className={`dashboard ${
          sideBarOpen ? "-is-sidebar-visible" : ""
        } js-dashboard`}
      >
        <AgentDBsideBar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
              
            <h1 className="text-30"> {translate("My Profile") }</h1>
            <div className="mt-20 rounded-12 bg-white shadow-2 px-40 py-40">
              <h5 className="text-20 fw-500 mb-30"> {translate("Profile Details") }</h5>
              <form
                                className=" d-flex flex-column w-100"
                                noValidate
                                onSubmit={handleSubmit}
                                name="profile" 
                            >
              <div className="contactForm row my-1">
                <div className="col-md-6">
                  <div className="form-input m-0 ">
                    <input type="text" required value={name}  onChange={handleInputChange(setName)} />
                    <label className="lh-1 text-16 text-light-1">
                       {translate("First Name") }
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input m-0">
                    <input type="text" required value={surname} onChange={handleInputChange(setSurname)}/>
                    <label className="lh-1 text-16 text-light-1">
                       {translate("Last Name") }
                    </label>
                  </div>
                </div>

                {/* <div className="col-md-6">
                  <div className="form-input m-0">
                    <input type="text" />
                    <label className="lh-1 text-16 text-light-1">
                       {translate("Company Name") }
                    </label>
                  </div>
                </div> */}

                <div className="col-md-6">
                  <div className="form-input m-0">
                    <input type="email" required value={email} onChange={handleInputChange(setEmail)}/>
                    <label className="lh-1 text-16 text-light-1">
                       {translate("Email Id") }
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input m-0">
                    <input type="text" required value={mobile} onChange={handleInputChange(setMobile)} />
                    <label className="lh-1 text-16 text-light-1">
                       {translate("Contact No") }
                    </label>
                  </div>
                </div>

                {/* change dropdown  */}

                <div className="col-md-6">
                <div className="form-input my-1 d-flex flex-column align-items-center add-tour-type">
                    <CreatableSelect
                      value={SelectedCountry}
                      onChange={HandleCountryChange}
                      options={CountryOptions}
                      className="custom-select"
                      placeholder="Select Country  "
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
                    <input type="text" required  value={city} onChange={handleInputChange(setCity)}/>
                    <label className="lh-1 text-16 text-light-1"> {translate("City") }</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input m-0">
                    <input type="text" required  value={street} onChange={handleInputChange(setStreet)}/>
                    <label className="lh-1 text-16 text-light-1"> {translate("Street") }</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input m-0">
                    <input type="text" required  value={houseNumber} onChange={handleInputChange(setHouseNumber)}/>
                    <label className="lh-1 text-16 text-light-1">
                       {translate("House No") }
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input m-0">
                    <input type="text" required  value={zipcode} onChange={handleInputChange(setZipcode)}/>
                    <label className="lh-1 text-16 text-light-1">
                       {translate("ZIP Code") }
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input m-0">
                    <input type="text" required  value={website} onChange={handleInputChange(setWebsite)}/>
                    <label className="lh-1 text-16 text-light-1"> {translate("Website") }</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input m-0 ">
                    <input type="text" required  value={tax_number} onChange={handleInputChange(setTaxNumber)} />
                    <label className="lh-1 text-16 text-light-1">
                       {translate("Tax Number") }
                    </label>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-input m-0">
                    <textarea required rows="2"  value={info} onChange={handleInputChange(setInfo)}></textarea>
                    <label className="lh-1 text-16 text-light-1"> {translate("Info") }</label>
                  </div>
                </div>

                <div className="col-12">
                  <h4 className="text-18 fw-500 mb-20"> {translate("Company Logo") }</h4>
                  <div className="row x-gap-20 y-gap my-1">
                    {image1 ? (
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
                             {translate("Upload Images") }
                          </div>
                        </label>
                        <input
                          onChange={handleImageChange1}
                          accept="image/*"
                          id="imageInp1"
                          type="file"
                          style={{ display: "none" }}
                        />
                      </div>
                    )}
                  </div>

                  <h4 className="text-18 fw-500 mb-20 mt-20"> {translate("Documents") }</h4>
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
                     {image2.map((image, index) => (
          <div className="col-auto my-2" key={index}>
            <div className="relative">
              <Image
                width={200}
                height={200}
                src={image}
                alt={`image-${index}`}
                className="size-200 rounded-12 object-cover"
              />
              <button
                onClick={() => handleDeleteImage2(index)}
                className="absoluteIcon1 button -dark-1"
              >
                <i className="icon-delete text-18"></i>
              </button>

              <div>Image {index + 1} rendered</div>

            </div>
          </div>
        ))}

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
               {translate("Upload Images") }
            </div>
          </label>
          <input
            onChange={handleImageChange2}
            accept="image/*"
            id="imageInp2"
            type="file"
            multiple
            style={{ display: "none" }}
          />
        </div>
                  </div>


                  <div className="text-14 mt-20">
                    PDF or PNG or JPG or DOC no bigger than 800px wide and tall.
                  </div>

                  <button className="button -md -info-2 bg-accent-1 text-white mt-30" type="submit">
                     {translate("Save Changes") }
                    {/* <i className="icon-arrow-top-right text-16 ml-10"></i> */}
                  </button>
                </div>
              </div>
              </form>
            </div>

            <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 mt-30">
              <h5 className="text-20 fw-500 mb-30">  {translate("Payout Account (IBAN)") }</h5>
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
                      <input type="text" required  value={bank_name} onChange={handleInputChange(setBankName)}/>
                      <label className="lh-1 text-16 text-light-1">
                         {translate("Bank Name") }
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row ">
                  <div className="col-md-6">
                    <div className="form-input my-1 ">
                      <input type="text" required  value={owner_name} onChange={handleInputChange(setOwnerName)}/>
                      <label className="lh-1 te xt-16 text-light-1">
                         {translate("Owner Name") }
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-input my-1 ">
                      <input type="text" required  value={IBAN} onChange={handleInputChange(setIBAN)}/>
                      <label className="lh-1 text-16 text-light-1"> {translate("IBAN") }</label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <button className="button -md -info-2 bg-accent-1 text-white mt-15">
                       {translate("Save Changes") }
                      {/* <i className="icon-arrow-top-right text-16 ml-10"></i> */}
                    </button>
                  </div>
                </div>
              </div>
              </form>
            </div>

            <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 mt-30">
              <h5 className="text-20 fw-500 mb-30"> {translate("Change Password") }</h5>
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
                        <input type="text" required />
                        <label className="lh-1 text-16 text-light-1">
                          {translate("Old password") }
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row my-1">
                    <div className="col-md-6">
                      <div className="form-input m-0 ">
                        <input type="text" required />
                        <label className="lh-1 text-16 text-light-1">
                          {translate("New password") }
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-input m-0 ">
                        <input type="text" required />
                        <label className="lh-1 text-16 text-light-1">
                          {translate("Confirm new password") }
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <button className="button -md -info-2 bg-accent-1 text-white">
                        {translate("Save Changes") }
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
