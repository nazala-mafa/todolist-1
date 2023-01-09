import { createSlice } from "@reduxjs/toolkit";

type ModalState = {
  modal: {
    visible: boolean;
    subject: string;
    title: string;
    deleteAttempt: () => () => Promise<void>;
  };
};

const initialState: ModalState = {
  modal: {
    visible: false,
    subject: "",
    title: "",
    deleteAttempt: () => async () => {},
  },
};

export const utilSlice = createSlice({
  name: "common.util",
  initialState,
  reducers: {
    showModal: (
      state,
      {
        payload,
      }: {
        payload: {
          subject: string;
          title: string;
          deleteAttempt: () => () => Promise<void>;
        };
      }
    ) => {
      state.modal.visible = true;
      state.modal.subject = payload.subject;
      state.modal.title = payload.title;
      state.modal.deleteAttempt = payload.deleteAttempt;
    },
    hideModal: (state) => {
      state.modal.visible = false;
      state.modal.subject = "";
      state.modal.title = "";
    },
  },
});
