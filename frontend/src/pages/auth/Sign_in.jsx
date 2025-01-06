import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/Loading/Loading";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

const SignIn = () => {
  const location = useLocation()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // State quản lý lỗi
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    accountError: ''
  });

  const navigate = useNavigate();

  const mutation = useMutationHooks((data) => UserService.loginUser(data));

  const { data, isPending, isSuccess, isError } = mutation;

  // Theo dõi trạng thái đăng nhập
  useEffect(() => {
    // Reset lỗi tài khoản khi bắt đầu đăng nhập
    setErrors(prev => ({
      ...prev,
      accountError: ''
    }));

    // Xử lý khi đăng nhập thành công
    if (isSuccess && data?.access_token) {
      if (location?.state) {
        navigate(location?.state)
      } else {
        navigate("/");
      }

      localStorage.setItem("access_token", JSON.stringify(data?.access_token));

      const decoded = jwtDecode(data?.access_token);
      if (decoded?.id) {
        localStorage.setItem("user_id", decoded.id);
        handleGetDetailsUser(decoded?.id, data?.access_token);
      }
    }

    // Xử lý khi đăng nhập thất bại
    if (isError || data?.status === 'ERR') {
      // Kiểm tra và hiển thị lỗi cụ thể
      const errorMessage = data?.message || 'Login failed. Please try again.';
      setErrors(prev => ({
        ...prev,
        accountError: errorMessage
      }));
    }
  }, [isSuccess, isError, data, location]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  // Validate email
  const validateEmail = (email) => {
    if (!email.trim()) {
      return 'Email cannot be blank'
    }
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (!emailRegex.test(email)) {
      return 'Invalid email format'
    }
    return ''
  }

  // Validate password
  const validatePassword = (password) => {
    if (!password.trim()) {
      return 'Password cannot be blank'
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters'
    }
    return ''
  }

  const handleOnchangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Validate ngay khi thay đổi
    setErrors(prev => ({
      ...prev,
      email: validateEmail(value),
      accountError: '' // Xóa lỗi tài khoản khi thay đổi email
    }));
  };

  const handleOnchangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Validate ngay khi thay đổi
    setErrors(prev => ({
      ...prev,
      password: validatePassword(value),
      accountError: '' // Xóa lỗi tài khoản khi thay đổi mật khẩu
    }));
  };

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const handleSignIn = () => {
    // Validate toàn bộ trước khi submit
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    // Cập nhật lỗi
    setErrors({
      email: emailError,
      password: passwordError,
      accountError: ''
    });

    // Chỉ submit nếu không có lỗi
    if (!emailError && !passwordError) {
      mutation.mutate({
        email,
        password,
      });
    }
  };

  return (
    <div className="h-screen  flex justify-center items-center">
      <div class="w-fit h-fit shadow-all rounded-sm border-5 border-gray-700">
        <div>
          <h6 className="text-center text-5xl font-bold py-4">Sign in</h6>
          <hr className="mt-6 border-b-1 mx-6 border-blueGray-300" />
        </div>

        <div className="px-6 py-4">
          <div class="w-full w-full max-w-lg min-w-[475px] py-6">
            <label class="block mb-2 text-3xl font-semibold text-slate-600">
              Email
            </label>
            <input
              id="signin_email"
              class={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border rounded-md px-4 py-5 transition duration-300 ease 
                ${errors.email
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-slate-200 focus:border-teal-700'}`}
              placeholder="Type here..."
              value={email}
              onChange={handleOnchangeEmail}
            />
            {errors.email && (
              <p className="text-red-500 text-2xl mt-2">{errors.email}</p>
            )}
          </div>

          <div class="w-full w-full min-w-[200px] py-6">
            <label class="block mb-2 text-3xl font-semibold text-slate-600">
              Password
            </label>
            <input
              id="signin_password"
              type="password"
              class={`w-full px-4 py-5 bg-transparent placeholder:text-slate-400 text-slate-600 text-3xl border rounded-md transition duration-300 ease 
                ${errors.password
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-slate-200 focus:border-teal-700'}`}
              placeholder="Type here..."
              value={password}
              onChange={handleOnchangePassword}
            />
            {errors.password && (
              <p className="text-red-500 text-2xl mt-2">{errors.password}</p>
            )}
          </div>

          {/* Hiển thị lỗi tài khoản */}
          {errors.accountError && (
            <div className="text-center py-4">
              <p className="text-red-500 text-2xl">{errors.accountError}</p>
            </div>
          )}
          {/* <div class="inline-flex items-center py-4">
            <label
              class="flex items-center cursor-pointer relative"
              for="checkbox"
            >
              <input
                type="checkbox"
                class="peer h-9 w-9 cursor-pointer transition-all appearance-none rounded-md shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                id="checkbox"
              />
              <span class="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <label
              class="cursor-pointer ml-2 text-slate-600 text-3xl"
              for="check-2"
            >
              Remember Me
            </label>
          </div> */}
          <Loading isPending={isPending}>
            <div className="flex justify-center items-center py-4">
              <button
                id="signin_button"
                data-ripple-light="true"
                class="rounded-md w-full font-bold bg-teal-900 py-5 border border-transparent text-center text-3xl text-white transition-all shadow-md hover:shadow-lg focus:shadow-none active:bg-teal-500 hover:bg-teal-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                disabled={!email.length || !password.length}
                onClick={handleSignIn}
              >
                Sign in
              </button>
            </div>
          </Loading>

          <p class="flex justify-center my-10 mx-6 text-3xl text-slate-600">
            Don't have an account?
            <a
              href=""
              class="ml-1 text-3xl font-semibold text-slate-700 underline"
              onClick={handleNavigateSignUp}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;