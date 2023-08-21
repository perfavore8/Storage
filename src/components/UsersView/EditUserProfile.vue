<template>
  <div class="profile-cover h-28 md:h-40 rounded-xl w-full" v-if="false">
    <div class="profile-cover-img-wrapper h-full relative">
      <img
        id="editProfileCoverImgModal"
        class="object-cover rounded-xl w-full h-full"
        src="https://htmlstream.com/preview/front-dashboard-v2.1.1/assets/img/1920x400/img1.jpg"
        alt="Image Description"
      />
      <div
        class="absolute bottom-0 right-0 overflow-hidden mb-0 p-4 text-slate-500 hover:text-blue-600"
      >
        <input
          type="file"
          class="absolute top-0 left-0 z-[-1] w-full h-full opacity-0"
          id="editProfileCoverUplaoderModal"
          data-hs-file-attach-options='{
                                  "textTarget": "#editProfileCoverImgModal",
                                  "mode": "image",
                                  "targetAttr": "src",
                                  "allowTypes": [".png", ".jpeg", ".jpg"]
                               }'
        />
        <label
          class="mb-0 border border-slate-200/70 flex items-center cursor-pointer bg-white shadow-md shadow-slate-400/25 py-2 px-4 text-sm text-center transition-all rounded-md"
          for="editProfileCoverUplaoderModal"
        >
          <span class="material-icons-round !text-base"> photo_camera </span>
          <span class="inline-block ml-1">Загрузить</span>
        </label>
      </div>
    </div>
  </div>
  <label
    v-if="false"
    class="avatar bg-white border-4 border-white flex cursor-pointer transition-all w-20 md:w-32 h-20 md:h-32 rounded-full relative mx-auto -mt-28 md:-mt-32"
    for="editAvatarUploaderModal"
  >
    <img
      id="editAvatarImgModal"
      class="w-32 rounded-full object-cover cursor-pointer"
      src="https://htmlstream.com/preview/front-dashboard-v2.1.1/assets/img/160x160/img9.jpg"
      alt="Image Description"
    />

    <input
      type="file"
      class="js-file-attach avatar-uploader-input"
      id="editAvatarUploaderModal"
      data-hs-file-attach-options='{
                              "textTarget": "#editAvatarImgModal",
                              "mode": "image",
                              "targetAttr": "src",
                              "allowTypes": [".png", ".jpeg", ".jpg"]
                           }'
    />

    <span
      class="absolute bottom-0 right-0 rounded-full aspect-square leading-none cursor-pointer bg-white p-2 text-slate-500 hover:text-blue-600 transition-all"
    >
      <span class="material-icons-round !text-xl !leading-none"> edit </span>
    </span>
  </label>
  <form class="grid gap-6">
    <span>Имя</span>
    <input type="text" class="input" v-model="copyUser.name" />
    <span>Email</span>
    <div class="relative mb-2 flex gap-2 items-center">
      <MaskEmail
        v-model:value="copyUser.email"
        placeholder="Email@example.com"
        class="mask-email input"
        :disabled="!user.email"
      />
      <button
        type="button"
        class="text-sm font-semibold leading-6 text-gray-900 disabled:text-gray-500 disabled:cursor-default disabled:font-medium"
        @click="showChangeModal('email', user.email)"
      >
        {{ user.email ? "Изменить" : "Добавить" }}
      </button>
    </div>

    <span>Телефон</span>
    <div class="flex gap-2 items-center">
      <input
        type="text"
        class="input"
        v-model="copyUser.phone"
        :disabled="!user.phone"
      />
      <button
        type="button"
        class="text-sm font-semibold leading-6 text-gray-900 disabled:text-gray-500 disabled:cursor-default disabled:font-medium"
        @click="showChangeModal('phone', user.phone)"
      >
        {{ user.phone ? "Изменить" : "Добавить" }}
      </button>
    </div>
  </form>
</template>

<script>
import { computed, reactive, watch } from "vue";
import store from "@/store";
export default {
  props: { user: Object },
  setup(props, context) {
    const copyUser = reactive({});
    const setCopyUser = () => {
      Object.assign(copyUser, { ...props.user });
      copyUser.isActive = Boolean(copyUser.is_active);
    };
    watch(
      () => props.user,
      () => setCopyUser(),
      { deep: true }
    );

    const dontNeedSave = computed(() => props.user.name === copyUser.name);

    const submit = async () => {
      let success = true;

      if (success && !dontNeedSave.value) {
        const { success: successReq } = await store.dispatch("updateUser", {
          name: copyUser.name,
        });
        success = success && successReq;
      } else {
        success = false;
      }

      if (dontNeedSave.value) success = true;

      return success;
    };

    const showChangeModal = (type, value) => {
      context.emit("showChangeModal", type, value);
    };

    return {
      copyUser,
      submit,
      showChangeModal,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.grid {
  grid-template-columns: 1fr 2fr;
}
.checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
  margin: 10px 0 0 20px;
}
.checkbox + label {
  position: relative;
  padding: 0 0 0 63px;
  margin-top: -14px;
  cursor: pointer;
  color: #3f3f3f;
  @include font(400, 16px, 19px);
}
.checkbox + label:before {
  content: "";
  position: absolute;
  top: -5px;
  left: 0;
  width: 56px;
  height: 25px;
  border-radius: 20px;
  background: #c4c4c4;
  transition: 0.15s ease-out;
}
.checkbox + label:after {
  content: "";
  position: absolute;
  top: -1px;
  left: 4px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: #fff;
  transition: 0.15s ease-out;
}
.checkbox:checked + label:before {
  background: #2685c0;
}
.checkbox:checked + label:after {
  left: 35px;
}
</style>
