import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as UserService from '../../services/UserService'
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/Loading/Loading";
import * as message from '../../components/Message/Message'

const SignUp = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Thêm state để quản lý lỗi
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  })

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )

  const { data, isPending, isSuccess, isError } = mutation

  useEffect(() => {
    if (isSuccess && data?.status !== 'ERR') {
      message.success("Registration successful!")
      handleNavigateSignIn()
    } else if (isError || data?.status === 'ERR') {
      message.error(data?.message || 'Error occurred')
    }
  }, [isSuccess, isError, data])

  // Validate name
  const validateName = (name) => {
    if (!name.trim()) {
      return 'Name cannot be blank'
    }
    if (name.length < 2) {
      return 'Name must be at least 2 characters'
    }
    if (name.length > 50) {
      return 'Name cannot exceed 50 characters'
    }
    // Kiểm tra tên chứa chữ cái (bao gồm cả chữ có dấu), khoảng trắng và cho phép viết hoa
    const nameRegex = /^[\p{L}\s]+$/u
    if (!nameRegex.test(name)) {
      return 'Name can only contain letters'
    }
    return ''
  }

  // Validate email
  const validateEmail = (email) => {
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (!email.trim()) {
      return 'Email cannot be blank'
    }
    if (!emailRegex.test(email)) {
      return 'Invalid email format'
    }
    return ''
  }

  const validatePhone = (phone) => {
    if (!phone.trim()) {
      return 'Phone number cannot be blank'
    }
    // Regex kiểm tra số điện thoại Việt Nam (hỗ trợ các đầu số hiện tại)
    const phoneRegex = /^(0[1-9][0-9]{8,9})$/
    if (!phoneRegex.test(phone)) {
      return 'Invalid phone number (must start with 0 and have 9-10 digits)'
    }
    return ''
  }

  // Validate address
  const validateAddress = (address) => {
    if (!address.trim()) {
      return 'Address cannot be blank'
    }
    if (address.length < 5) {
      return 'Address must be at least 5 characters'
    }
    if (address.length > 200) {
      return 'Address cannot exceed 200 characters'
    }
    return ''
  }

  // Validate password
  const validatePassword = (password) => {
    if (!password.trim()) {
      return 'Password cannot be blank'
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters'
    }
    // Kiểm tra mật khẩu có chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if (!passwordRegex.test(password)) {
      return 'Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number'
    }
    return ''
  }

  // Validate confirm password
  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword.trim()) {
      return 'Please confirm password'
    }
    if (password !== confirmPassword) {
      return 'Confirmation password does not match'
    }
    return ''
  }

  const handleOnchangeName = (e) => {
    const value = e.target.value
    setName(value)
    // Validate ngay khi thay đổi
    setErrors(prev => ({
      ...prev,
      name: validateName(value)
    }))
  }

  const handleOnchangeEmail = (e) => {
    const value = e.target.value
    setEmail(value)
    // Validate ngay khi thay đổi
    setErrors(prev => ({
      ...prev,
      email: validateEmail(value)
    }))
  }

  const handleOnchangePhone = (e) => {
    const value = e.target.value
    setPhone(value)
    // Validate ngay khi thay đổi
    setErrors(prev => ({
      ...prev,
      phone: validatePhone(value)
    }))
  }

  const handleOnchangeAddress = (e) => {
    const value = e.target.value
    setAddress(value)
    // Validate ngay khi thay đổi
    setErrors(prev => ({
      ...prev,
      address: validateAddress(value)
    }))
  }

  const handleOnchangePassword = (e) => {
    const value = e.target.value
    setPassword(value)
    // Validate ngay khi thay đổi
    setErrors(prev => ({
      ...prev,
      password: validatePassword(value),
      confirmPassword: validateConfirmPassword(value, confirmPassword)
    }))
  }

  const handleOnchangeConfirmPassword = (e) => {
    const value = e.target.value
    setConfirmPassword(value)
    // Validate ngay khi thay đổi
    setErrors(prev => ({
      ...prev,
      confirmPassword: validateConfirmPassword(password, value)
    }))
  }

  const handleNavigateSignIn = () => {
    navigate('/sign-in')
  }

  const handleSignUp = () => {
    // Validate toàn bộ trước khi submit
    const nameError = validateName(name)
    const emailError = validateEmail(email)
    const phoneError = validatePhone(phone)
    const addressError = validateAddress(address)
    const passwordError = validatePassword(password)
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword)

    // Cập nhật toàn bộ lỗi
    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      address: addressError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    })

    // Chỉ submit nếu không có lỗi
    if (!nameError && !emailError && !phoneError && !addressError && !passwordError && !confirmPasswordError) {
      mutation.mutate({
        name,
        role: 'user',
        phone,
        address,
        avatar: '',
        email,
        password,
        confirmPassword
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-2xl space-y-8 bg-white shadow-xl rounded-xl border border-gray-200 p-10">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Sign up</h2>
          <p className="text-3xl text-gray-600 mb-8">Create your account</p>
        </div>

        <form className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-3xl font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-4 py-4 border rounded-md text-3xl transition-all duration-300 
                ${errors.name
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'}`}
              placeholder="Enter your name"
              value={name}
              onChange={handleOnchangeName}
            />
            {errors.name && (
              <p className="text-red-500 text-2xl mt-2">{errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-3xl font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-4 border rounded-md text-3xl transition-all duration-300 
                ${errors.email
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'}`}
              placeholder="Enter your email"
              value={email}
              onChange={handleOnchangeEmail}
            />
            {errors.email && (
              <p className="text-red-500 text-2xl mt-2">{errors.email}</p>
            )}
          </div>

          {/* Phone Input */}
          <div>
            <label htmlFor="phone" className="block text-3xl font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              className={`w-full px-4 py-4 border rounded-md text-3xl transition-all duration-300 
                ${errors.phone
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'}`}
              placeholder="Enter your phone number"
              value={phone}
              onChange={handleOnchangePhone}
            />
            {errors.phone && (
              <p className="text-red-500 text-2xl mt-2">{errors.phone}</p>
            )}
          </div>

          {/* Address Input */}
          <div>
            <label htmlFor="address" className="block text-3xl font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              id="address"
              type="text"
              className={`w-full px-4 py-4 border rounded-md text-3xl transition-all duration-300 
                ${errors.address
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'}`}
              placeholder="Enter your address"
              value={address}
              onChange={handleOnchangeAddress}
            />
            {errors.address && (
              <p className="text-red-500 text-2xl mt-2">{errors.address}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-3xl font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`w-full px-4 py-4 border rounded-md text-3xl transition-all duration-300 
                ${errors.password
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'}`}
              placeholder="Enter your password"
              value={password}
              onChange={handleOnchangePassword}
            />
            {errors.password && (
              <p className="text-red-500 text-2xl mt-2">{errors.password}</p>
            )}
            <p className="text-2xl text-gray-500 mt-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
              At least 8 characters with uppercase, lowercase, and number
            </p>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirm_password" className="block text-3xl font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              id="confirm_password"
              type="password"
              className={`w-full px-4 py-4 border rounded-md text-3xl transition-all duration-300 
                ${errors.confirmPassword
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'}`}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleOnchangeConfirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-2xl mt-2">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <Loading isPending={isPending}>
            <button
              type="button"
              className="w-full py-4 px-4 border border-transparent rounded-md shadow-sm text-3xl font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 disabled:opacity-50"
              disabled={!name || !email || !phone || !address || !password || !confirmPassword}
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </Loading>

          {/* Sign In Link */}
          <p className="text-center text-2xl text-gray-600 mt-4">
            Already have an account?
            <a
              href="#"
              className="text-teal-600 font-semibold underline"
              onClick={handleNavigateSignIn}
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;