import { supabase } from "../lib/supabase";
import { uploadFile } from "./imageService";

export const createOrUpdatePost = async (post) => {
  try {
    //upload image
    if (post.file && typeof post.file == "object") {
      let isImage = post?.file?.type == "image";
      let folderName = isImage ? "postImages" : "postVideos";
      let fileResult = await uploadFile(folderName, post?.file?.uri, isImage);
      if (fileResult.success) post.file = fileResult.data;
      else {
        return fileResult;
      }
    }

    const { data, error } = await supabase
      .from("posts")
      .upsert(post)
      .select()
      .single();

    if (error) {
      console.log("create post: ", error);
      return { success: false, msg: "Khoong thể tạo bài viết của bạn" };
    }
    return { success: true, data: data };
  } catch (error) {
    consloe.log("createPost error: ", error);
    return { success: false, msg: "Không thể tạo bài viết của bạn" };
  }
};

export const fetchPosts = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        user: users (id, name, image),
        postLikes (*)
        `
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      consloe.log("fetchPosts error: ", error);
      return { success: false, msg: "Không thể tải bài viết" };
    }

    return { success: true, data: data };
  } catch (error) {
    consloe.log("fetchPosts error: ", error);
    return { success: false, msg: "Không thể tải bài viết" };
  }
};

export const createPostLike = async (postLike) => {
  try {
    const { data, error } = await supabase
      .from("postLikes")
      .insert(postLike)
      .select()
      .single();

    if (error) {
      consloe.log("postLike error: ", error);
      return { success: false, msg: "Không thể thích bài viết" };
    }

    return { success: true, data: data };
  } catch (error) {
    consloe.log("fetchPosts error: ", error);
    return { success: false, msg: "Không thể thích bài viết" };
  }
};

export const removePostLike = async (postId, userId) => {
  try {
    const { error } = await supabase
      .from("postLikes")
      .delete()
      .eq("userId", userId)
      .eq("postId", postId);

    if (error) {
      consloe.log("postLike error: ", error);
      return { success: false, msg: "Không thể xóa thích bài viết" };
    }

    return { success: true };
  } catch (error) {
    consloe.log("fetchPosts error: ", error);
    return { success: false, msg: "Không thể xóa thích bài viết" };
  }
};
