import React, { useEffect, useState } from "react";
import NewsItem from "../../components/news/NewsItem";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import CustomAlert from "../../components/CustomAlert";
import BackButton from "../../components/BackButton";
import ErrorMessage from "../../components/ErrorMessage";
import FloatingErrorAlert from "../../components/FloatingErrorAlert";
import PostModal from "../../components/admin/PostModal";
import Pagination from "../../components/news/Pagination";

const API_URL = process.env.REACT_APP_API_URL;

function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
  const [confirmPost, setConfirmPost] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/posts`);
      if (!response.ok) throw new Error("Błąd pobierania danych.");
      const data = await response.json();
      const sorted = data.sort((a, b) => new Date(b.data) - new Date(a.data));
      setPosts(sorted);
    } catch (err) {
      console.error(err);
      setError("Nie udało się pobrać postów.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedPost(null);
    setModalOpen(true);
  };

  const handleEdit = (slug) => {
    const post = posts.find((p) => p.url === slug);
    setSelectedPost(post);
    setModalOpen(true);
  };

  const handleDelete = (slug) => {
    const post = posts.find((p) => p.url === slug);
    setConfirmPost(post);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${API_URL}/api/posts/${confirmPost.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Błąd usuwania posta.");
      setPosts((prev) => prev.filter((p) => p.id !== confirmPost.id));
      setAlertMessage("Post został usunięty.");
    } catch (err) {
      console.error(err);
      setDeleteErrorMessage("Nie udało się usunąć posta.");
    } finally {
      setIsDeleting(false);
      setConfirmPost(null);
      setTimeout(() => setDeleteErrorMessage(""), 5000);
    }
  };

  const handleSave = async (formDataFromModal) => {
    try {
      const isEdit = !!selectedPost;

      // 1. Utwórz dane posta bez zdjęć
      const postData = new FormData();
      for (const [key, value] of formDataFromModal.entries()) {
        if (key !== "images") postData.append(key, value);
      }

      const response = await fetch(
        isEdit
          ? `${API_URL}/api/posts/${selectedPost.id}`
          : `${API_URL}/api/posts`,
        {
          method: isEdit ? "PUT" : "POST",
          credentials: "include",
          body: postData,
        }
      );

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.message || "Błąd zapisu.");
      }

      const result = await response.json(); // zawiera `id` nowego posta
      const postId = isEdit ? selectedPost.id : result.id;

      // 2. Jeśli są zdjęcia, wyślij je osobno
      const images = formDataFromModal.getAll("images");
      if (images.length > 0) {
        const imgForm = new FormData();
        images.forEach((img) => imgForm.append("images", img));
        const imgRes = await fetch(`${API_URL}/api/posts/${postId}/images`, {
          method: "POST",
          credentials: "include",
          body: imgForm,
        });

        if (!imgRes.ok) {
          throw new Error("Nie udało się zapisać zdjęć.");
        }
      }

      await fetchPosts();
      setAlertMessage(isEdit ? "Zaktualizowano post." : "Dodano nowy post.");
      setModalOpen(false);
    } catch (err) {
      console.error("Błąd zapisu posta:", err);
      throw err;
    }
  };

  return (
    <main className="page admin-posts-page">
      <BackButton />
      <h1>Zarządzanie aktualnościami</h1>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchPosts} />
      ) : posts.length === 0 ? (
        <ErrorMessage message="Brak postów do wyświetlenia." />
      ) : (
        <div className="post-list light-section">
          {currentPosts.map((post) => (
            <div key={post.id} className="post-item-wrapper admin">
              <NewsItem
                key={post.id}
                title={post.tytul}
                description={
                  post.opis.length > 120
                    ? post.opis.substring(0, 120) + "..."
                    : post.opis
                }
                date={
                  post.data_utworzenia
                    ? new Date(post.data_utworzenia).toLocaleDateString("pl-PL")
                    : "brak daty"
                }
                image={post.miniatura}
                slug={post.url}
              />
              <div className="admin-controls">
                <Button variant="primary" onClick={() => handleEdit(post.url)}>
                  Edytuj
                </Button>
                <Button variant="danger" onClick={() => handleDelete(post.url)}>
                  Usuń
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}

      {!isLoading && !error && (
        <div className="add-post">
          <Button variant="secondary" onClick={handleAdd}>
            Dodaj nowy post
          </Button>
        </div>
      )}

      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setAlertMessage(null)}
        />
      )}

      {confirmPost && (
        <CustomAlert
          message={`Czy na pewno chcesz usunąć post "${confirmPost.tytul}"?`}
          onConfirm={confirmDelete}
          onClose={() => setConfirmPost(null)}
          confirmButtonText="Usuń"
          cancelButtonText="Anuluj"
        />
      )}

      <PostModal
        isOpen={modalOpen}
        initialData={selectedPost}
        postId={selectedPost?.id}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      {deleteErrorMessage && (
        <FloatingErrorAlert message={deleteErrorMessage} />
      )}
      {isDeleting && (
        <div className="spinner-overlay">
          <Spinner />
        </div>
      )}
    </main>
  );
}

export default AdminPostsPage;
