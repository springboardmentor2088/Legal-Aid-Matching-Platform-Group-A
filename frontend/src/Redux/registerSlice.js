import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ---------------------------------------------
// 1. SEND DATA TO BACKEND  
// ---------------------------------------------
export const submitRegistration = createAsyncThunk(
    "register/submitRegistration",
    async ({ role, data }, { rejectWithValue }) => {
        try {
            // -----------------------------------------
            // CITIZEN → SEND JSON (NOT FormData)
            // -----------------------------------------
            if (role === "Citizen") {
                const payload = {
                    fullName: data.fullName,
                    aadharNum: data.aadhar,
                    email: data.email,
                    mobileNum: data.phone,
                    dateOfBirth: data.dob,
                    state: data.state,
                    district: data.district,
                    city: data.city,
                    address: data.address,
                    password: data.password,
                };

                const response = await axios.post(
                    "http://localhost:8080/citizens/add",
                    payload,
                    { headers: { "Content-Type": "application/json" } }
                );

                return response.data;
            }

            // -----------------------------------------
            // LAWYER + NGO → THEY HAVE FILE UPLOADS → USE FORMDATA
            // -----------------------------------------
            const formData = new FormData();
            
            if (role === "Lawyer") {
                // Map Lawyer form fields to backend expected field names
                formData.append("fullName", data.fullName || "");
                formData.append("email", data.email || "");
                formData.append("phone", data.phone || "");
                formData.append("aadhar", data.aadhar || "");
                if (data.aadharProof) {
                    formData.append("aadharProof", data.aadharProof);
                }
                formData.append("barId", data.barId || "");
                formData.append("barState", data.barState || "");
                formData.append("specialization", data.specialization || "");
                if (data.barCert) {
                    formData.append("barCert", data.barCert);
                }
                formData.append("experience", data.experience || "");
                formData.append("address", data.address || "");
                formData.append("district", data.district || "");
                formData.append("city", data.city || "");
                formData.append("state", data.state || "");
                if (data.latitude) {
                    formData.append("latitude", data.latitude);
                }
                if (data.longitude) {
                    formData.append("longitude", data.longitude);
                }
                formData.append("password", data.password || "");
            } else if (role === "NGO") {
                // Map NGO form fields to backend expected field names
                formData.append("ngoName", data.ngoName || "");
                formData.append("ngoType", data.ngoType || "");
                formData.append("registrationNumber", data.registrationNumber || "");
                if (data.registrationCertificate) {
                    formData.append("registrationCertificate", data.registrationCertificate);
                }
                formData.append("contact", data.contact || "");
                formData.append("email", data.email || "");
                formData.append("address", data.address || "");
                formData.append("state", data.state || "");
                formData.append("district", data.district || "");
                formData.append("city", data.city || "");
                formData.append("pincode", data.pincode || "");
                if (data.latitude) {
                    formData.append("latitude", data.latitude);
                }
                if (data.longitude) {
                    formData.append("longitude", data.longitude);
                }
                formData.append("password", data.password || "");
            }

            // Fix endpoint URL - use correct path for each role
            let endpoint;
            if (role === "Lawyer") {
                endpoint = "http://localhost:8080/lawyers/add";
            } else if (role === "NGO") {
                endpoint = "http://localhost:8080/ngos/add";
            } else {
                endpoint = "http://localhost:8080/" + role.toLowerCase() + "/add";
            }

            const response = await axios.post(
                endpoint,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            return response.data;

        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);


// ---------------------------------------------
// 2. GET DATA FROM BACKEND 
// ---------------------------------------------
export const fetchRegistrations = createAsyncThunk(
    "register/fetchRegistrations",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:8080/api/users");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Unable to fetch users");
        }
    }
);

// ---------------------------------------------
// INITIAL STATE 
// ---------------------------------------------
const initialState = {
    role: "Citizen",

    citizen: {
        fullName: "",
        aadhar: "",
        email: "",
        phone: "",
        dob: "",
        state: "",
        district: "",
        city: "",
        address: "",
        password: "",
        confirmPassword: "",
    },

    lawyer: {
        fullName: "",
        email: "",
        phone: "",
        aadhar: "",
        aadharProofFilename: "", // Store filename only, not File object
        barId: "",
        barState: "",
        specialization: "",
        barCertFilename: "", // Store filename only, not File object
        experience: "",
        address: "",
        district: "",
        city: "",
        state: "",
        latitude: "",
        longitude: "",
        password: "",
        confirmPassword: "",
    },

    ngo: {
        ngoName: "",
        ngoType: "",
        registrationNumber: "",
        registrationCertificateFilename: "", // Store filename only, not File object
        contact: "",
        email: "",
        address: "",
        state: "",
        district: "",
        city: "",
        pincode: "",
        latitude: "",
        longitude: "",
        password: "",
        confirmPassword: "",
    },

    loading: false,
    error: null,
    backendUsers: [],
};

// ---------------------------------------------
// REDUCER + ACTIONS
// ---------------------------------------------
const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },

        updateCitizen: (state, action) => {
            const { field, value } = action.payload;
            state.citizen[field] = value;
        },

        updateLawyer: (state, action) => {
            const { field, value } = action.payload;
            state.lawyer[field] = value;
        },

        updateNGO: (state, action) => {
            const { field, value } = action.payload;
            state.ngo[field] = value;
        },
    },

    extraReducers: (builder) => {
        // SUBMIT REGISTRATION
        builder
            .addCase(submitRegistration.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitRegistration.fulfilled, (state, action) => {
                state.loading = false;
                console.log("Registration Successful:", action.payload);
            })
            .addCase(submitRegistration.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // FETCH USERS
        builder
            .addCase(fetchRegistrations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRegistrations.fulfilled, (state, action) => {
                state.loading = false;
                state.backendUsers = action.payload;
            })
            .addCase(fetchRegistrations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setRole, updateCitizen, updateLawyer, updateNGO } =
    registerSlice.actions;

export default registerSlice.reducer;
