import * as Yup from 'yup';

// Login Validation
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .test(
      "email-or-phone",
      "Please enter a valid email address or phone number",
      function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validates email
        const phoneRegex = /^\d{10}$/; // Validates 10-digit phone numbers
        // Also allow international formats
        const internationalPhoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

        return (
          emailRegex.test(value) ||
          phoneRegex.test(value) ||
          internationalPhoneRegex.test(value)
        );
      }
    )
    .required("Email or phone number is required"),
  
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

// forgot Password Validation
export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
  .email('Please enter a valid email address (e.g. example@example.com)')
    .required('Email is required')
});
// register validation
export const registerValidationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'First Name is too short!')
    .max(50, 'First Name is too long!')
    .required('First Name is required'),

  last_name: Yup.string()
    .min(2, 'Last Name is too short!')
    .max(50, 'Last Name is too long!')
    .required('Last Name is required'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  phone_number: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number is not valid')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number can be up to 15 digits')
    .required('Phone number is required'),

  country: Yup.string()
    .required('Country is required'),

  state: Yup.string()
    .required('State is required'),

  city: Yup.string()
    .required('City is required'),

  hospitalId: Yup.string()
    .required('Please select a hospital'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
// Otp Validation
export const otpValidationSchema = Yup.object().shape({
  otp: Yup.array()
    .of(
      Yup.string()
        .length(1, "Each OTP field must be 1 digit")
        .required("This field is required")
    )
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits"),
});

export const pregisterValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters long")
    .max(50, "Last name cannot exceed 50 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  age: Yup.number()
    .required("Age is required")
    .min(1, "Age must be at least 1")
    .max(120, "Age must be less than 120"),
  gender: Yup.string().required("Gender is required"),
  bloodGroup: Yup.string().required("Blood group is required"),
  height: Yup.string()
    .required("Height is required")
    .matches(/^\d+'?\d*$/, "Height must be in the format 'x'y' or x'"),
  weight: Yup.number()
    .required("Weight is required")
    .min(1, "Weight must be at least 1")
    .max(500, "Weight must be less than 500"),
  birthdate: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  hospitalId: Yup.string().required("Hospital is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords must match")
    .required("Confirm password is required"),
  agreeToTerms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

// Validation schema using Yup
export const resetPasswordValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});