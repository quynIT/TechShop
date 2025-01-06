import React, { useEffect, useState } from "react";
import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../Loading/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    return UserService.updateUser(id, access_token, rests);
  });

  const dispatch = useDispatch();
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnchangeName = (e) => {
    setName(e.target.value);
  };

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnchangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleOnchangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      access_token: user?.access_token,
      name,
      email,
      phone,
      address,
      avatar,
    });
  };

  return (
    <div
      style={{
        width: "1270px",
        margin: "0 auto",
        marginTop: "30px",
        height: "500px",
      }}
    >
      <Loading isPending={isPending}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLabel htmlFor="name">Name</WrapperLabel>
            <input
              style={{ width: "300px" }}
              id="name"
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-2xl border border-slate-200 rounded-md px-4 py-5 transition duration-300 ease focus:outline-none focus:border-teal-700 hover:border-teal-500 shadow-sm focus:shadow"
              onChange={handleOnchangeName}
              placeholder={name}
            />
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="email">Email</WrapperLabel>
            <input
              style={{ width: "300px" }}
              id="email"
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-2xl border border-slate-200 rounded-md px-4 py-5 transition duration-300 ease focus:outline-none focus:border-teal-700 hover:border-teal-500 shadow-sm focus:shadow"
              onChange={handleOnchangeEmail}
              placeholder={email}
            />
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
            <input
              style={{ width: "300px" }}
              id="phone"
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-2xl border border-slate-200 rounded-md px-4 py-5 transition duration-300 ease focus:outline-none focus:border-teal-700 hover:border-teal-500 shadow-sm focus:shadow"
              onChange={handleOnchangePhone}
              placeholder={phone}
            />
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="address">Address</WrapperLabel>
            <input
              style={{ width: "300px" }}
              id="address"
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-2xl border border-slate-200 rounded-md px-4 py-5 transition duration-300 ease focus:outline-none focus:border-teal-700 hover:border-teal-500 shadow-sm focus:shadow"
              onChange={handleOnchangeAddress}
              placeholder={address}
            />
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select file</Button>
            </WrapperUploadFile>
            {avatar && (
              <img
                src={avatar}
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="avatar"
              />
            )}
            {/* <input
                            style={{ width: '300px' }}
                            id="avatar"
                            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-2xl border border-slate-200 rounded-md px-4 py-5 transition duration-300 ease focus:outline-none focus:border-teal-700 hover:border-teal-500 shadow-sm focus:shadow"
                            value={avatar} onChange={handleOnchangeAvatar}
                        /> */}
          </WrapperInput>
          <button
            style={{
              width: "fit-content",
              height: "30px",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            className="w-96 h-32 mx-auto flex items-center justify-center text-white text-2xl font-bold bg-blue-400 border-2 border-blue-400 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-blue-500 hover:border-blue-500 hover:shadow-lg active:scale-95 disabled:opacity-50"
            id="signin_button"
            type="button"
            onClick={handleUpdate}
          >
            Update
          </button>
        </WrapperContentProfile>
      </Loading>
    </div>
  );
};

export default ProfilePage;
