import { reactive } from "vue";

const notificationsData = reactive([
  {
    type: 0,
    header: "Notification info",
    text: "Lorem ipsum dolor",
    show: false,
    timer: null,
  },
  {
    type: 1,
    header: "Notification success",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    show: false,
    timer: null,
  },
  {
    type: 2,
    header: "Notification warning",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio animi libero vel",
    show: false,
    timer: null,
  },
  {
    type: 3,
    header: "Notification error",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio animi libero vel, quas neque tenetur ipsum voluptatum!",
    show: false,
    timer: null,
  },
]);

export function useNotification() {
  const delay = 8000;

  const addNotification = (type, header, text) => {
    const notification = reactive({
      type: type,
      header: header,
      text: text,
      show: true,
      timer: setTimeout(() => (notification.show = false), delay),
    });
    notificationsData.push(notification);
  };

  return { notificationsData, addNotification, delay };
}
