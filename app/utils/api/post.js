import axios from "axios";
import { headers } from "./headers";
let serverURL = process.env.NEXT_PUBLIC_API_URL;

export const POST = {

    handleForm: (data) => {
        const { form, post } = data;
        form.preventDefault();
        if (!form.target.checkValidity()) {
            form.preventDefault();
            form.stopPropagation();
        }
        form.target.classList.add("was-validated");
        if (form.target.checkValidity()) {
            data.form = form.target;
            post(data);
        }
    },

    request: async ({ form, url, header, token }) => {
        let formData;
        
        if (form && form.tagName === "FORM") {
            formData = new FormData(form);
            
            
        } else if (form instanceof FormData) {
            formData = form;
        } else {
            formData = new FormData();
            for (let key in form) {
                if (form.hasOwnProperty(key)) {
                    formData.append(key, form[key]);
                }
            }
            
        }

        let requestHeader = { ...headers };

        if (header) {
            requestHeader = {
                ...requestHeader,
                ...header,
            };
        }
        if (token) {
            requestHeader = {
                ...requestHeader,
                Authorization: `Bearer ${token}`,
            };
        }

        if (formData) {
            formData.append("AccessKey", process.env.NEXT_PUBLIC_ACCESS_KEY);

        }
        try {

            const response = await axios.post(`${serverURL}${url}`, formData || {}, { headers: requestHeader });
            if (response.status === 401) {
                return { data: '', accessError: true };
            } else {
                return response.data;
            }
        } catch (error) {
            // console.error('Error Response:', error.response || error.message || error);
            if (error.response && error.response.status === 401 && (window.location.pathname !== "/vendor/login" || window.location.pathname !== "/login")) {
                // window.location.href = "/vendor/login";
                return { data: '', accessError: true };
            } else if (error.response && error.response.status === 401) {
                return { data: '', accessError: true }
            } else {
                return { data: '', error: error.response ? error.response.data : 'Network or server error' };
            }
        }
    },
}

