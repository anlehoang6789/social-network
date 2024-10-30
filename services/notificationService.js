import { supabase } from "../lib/supabase";

export const createNotification = async (notification) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert(notification)
      .select()
      .single();

    if (error) {
      console.log("notification error: ", error);
      return { success: false, msg: "Có lỗi xảy ra" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("notification error: ", error);
    return { success: false, msg: "Có lỗi xảy ra" };
  }
};

export const fetchNotifications = async (receiverId) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select(
        `
          *,
          sender: senderId(id, name, image)
          `
      )
      .eq("receiverId", receiverId)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("fetchNotifications error: ", error);
      return { success: false, msg: "Không thể tải thông báo" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("fetchNotifications error: ", error);
    return { success: false, msg: "Không thể tải thông báo" };
  }
};
