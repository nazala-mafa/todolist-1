import { base_email } from "./../../../app/config";
import { base_url } from "../../../app/config";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  Activity,
  DetailActivityResponse,
  NewActivityRequest,
  NewActivityResponse,
} from "./activityInterface";
import { createSlice } from "@reduxjs/toolkit";

// ================
// === Activity ===
// ================

export const activityApi = createApi({
  reducerPath: "activity.api",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    getAllActivity: builder.query<Activity[], void>({
      query: () => ({
        url: "activity-groups",
        params: {
          email: base_email,
        },
        method: "GET",
      }),
      transformResponse(response: { data: Activity[] }) {
        return response.data;
      },
    }),
    createActivify: builder.mutation<NewActivityResponse, NewActivityRequest>({
      query: (body) => ({
        url: "activity-groups",
        method: "POST",
        body,
      }),
      transformResponse(response: NewActivityResponse) {
        return response;
      },
    }),
    getDetailActivity: builder.query<
      DetailActivityResponse,
      Pick<Activity, "id">
    >({
      query: ({ id }) => ({
        url: `activity-groups/${id}`,
        method: "GET",
      }),
    }),
    deleteActivity: builder.mutation<void, number>({
      query: (activity_id) => ({
        url: `activity-groups/${activity_id}`,
        method: "DELETE",
      }),
    }),
    updateActivityTitle: builder.mutation<
      Activity,
      Pick<Activity, "id" | "title">
    >({
      query: ({ id, title }) => ({
        url: `activity-groups/${id}`,
        method: "PATCH",
        body: { title },
      }),
      transformResponse(response: Activity) {
        return response;
      },
    }),
  }),
});

export const {
  useGetAllActivityQuery,
  useCreateActivifyMutation,
  useGetDetailActivityQuery,
  useDeleteActivityMutation,
  useUpdateActivityTitleMutation,
} = activityApi;

// ===============
// ==== Modal ====
// ===============

type activitySettingModalInitialStateType = {
  title: string;
  visible: boolean;
  type: "create" | "edit";
  formState?: {
    id: number | undefined;
    title: string;
    priority: string;
  };
};

export const activitySettingModalInitialState: activitySettingModalInitialStateType =
  {
    title: "",
    visible: false,
    type: "create",
    formState: {
      id: undefined,
      title: "",
      priority: "",
    },
  };

const activitySettingModal = createSlice({
  name: "activity.util",
  initialState: activitySettingModalInitialState,
  reducers: {
    showModal: (
      state,
      {
        payload,
      }: { payload: Omit<activitySettingModalInitialStateType, "visible"> }
    ) => {
      state.title = payload.title;
      state.visible = true;
      state.type = payload.type;
      payload.formState && (state.formState = payload.formState);
    },
    hideModal: (state) => {
      state.visible = false;
    },
  },
});

export const settingModalSlice = activitySettingModal.reducer;
export const { showModal, hideModal } = activitySettingModal.actions;
