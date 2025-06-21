// controllers/postController.js
const Post = require("../models/post");
const fs = require("fs");
const path = require("path");

exports.getAll = async (req, res) => {
  try {
    const [rows] = await Post.findAll();

    const postsWithThumbnails = await Promise.all(
      rows.map(async (post) => {
        let miniatura = null;

        if (post.zdjecia) {
          const dirPath = path.join(__dirname, "..", "public", post.zdjecia);
          try {
            const files = await fs.promises.readdir(dirPath);
            if (files.length > 0) {
              miniatura = path.posix.join(post.zdjecia, files[0]); // np. "/uploads/posts/2/abc123.jpg"
            }
          } catch (err) {
            console.warn(`Brak folderu lub plików dla postu ID ${post.id}`);
          }
        }

        return {
          ...post,
          miniatura,
        };
      })
    );

    res.json(postsWithThumbnails);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.getOne = async (req, res) => {
  const { idOrSlug } = req.params;
  try {
    const [rows] = await Post.findOne(idOrSlug);
    if (!rows.length)
      return res.status(404).json({ message: "Nie znaleziono wpisu" });
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.create = async (req, res) => {
  const { tytul, url, opis, widocznosc } = req.body;
  if (!tytul || !url || !opis) {
    return res
      .status(400)
      .json({ message: "Brakuje tytułu, slug-a lub opisu" });
  }
  try {
    const [result] = await Post.create({ tytul, url, opis, widocznosc });
    res.status(201).json({ message: "Wpis utworzony", id: result.insertId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const fields = req.body;

  if (
    !fields ||
    typeof fields !== "object" ||
    Object.keys(fields).length === 0
  ) {
    return res.status(400).json({ message: "Brak danych do aktualizacji" });
  }

  try {
    // Sprawdź, czy post istnieje
    const [rows] = await Post.findOne(id);
    if (!rows.length)
      return res.status(404).json({ message: "Nie znaleziono wpisu" });

    const post = rows[0];

    // Jeśli użytkownik chce usunąć wszystkie zdjęcia (zdjecia === null)
    if (fields.zdjecia === null && post.zdjecia) {
      const folderPath = path.join(__dirname, "..", "public", post.zdjecia);
      if (fs.existsSync(folderPath)) {
        await fs.promises.rm(folderPath, { recursive: true, force: true });
      }
    }

    // Przejdź do aktualizacji danych w bazie
    const [result] = await Post.update(id, fields);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Nie znaleziono wpisu" });
    }

    res.json({ message: "Wpis zaktualizowany" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  try {
    // Najpierw znajdź post, aby pobrać ścieżkę do zdjęć
    const [rows] = await Post.findOne(id);
    if (!rows.length) {
      return res.status(404).json({ message: "Nie znaleziono wpisu" });
    }

    const folder = rows[0].zdjecia; // np. "/uploads/posts/2"
    const dirPath = path.join(__dirname, "..", "public", folder); // fizyczna ścieżka

    // Usuń folder i jego zawartość, jeśli istnieje
    if (fs.existsSync(dirPath)) {
      await fs.promises.rm(dirPath, { recursive: true, force: true });
    }

    // Następnie usuń wpis z bazy
    const [result] = await Post.remove(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Nie znaleziono wpisu" });
    }

    res.json({ message: "Wpis i folder zdjęć usunięty" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Błąd serwera przy usuwaniu" });
  }
};

// obsługa uploadu zdjęć
exports.uploadImages = async (req, res) => {
  const { id } = req.params;
  if (!req.files || !req.files.length) {
    return res.status(400).json({ message: "Brak plików do wgrania" });
  }
  const folder = path.posix.join("/uploads/posts", id);
  try {
    // zapis ścieżki do bazy
    await Post.update(id, { zdjecia: folder });
    const urls = req.files.map((f) => `${folder}/${f.filename}`);
    res.json({ message: "Zdjęcia wgrane", images: urls });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.getImages = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await Post.findOne(id);
    if (!rows.length)
      return res.status(404).json({ message: "Post nie istnieje" });

    const folder = rows[0].zdjecia; // np. "/uploads/posts/2"
    const dirPath = path.join(__dirname, "..", "public", folder); // fizyczna ścieżka

    const files = await fs.promises.readdir(dirPath); // odczyt plików z dysku
    const urls = files.map((file) => path.posix.join(folder, file)); // URL-e

    res.json({ images: urls });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

// DELETE /api/posts/:id/image?name=abc.jpg
exports.deleteImage = async (req, res) => {
  const { id } = req.params;
  const { name } = req.query;

  if (!name) return res.status(400).json({ message: "Brak nazwy pliku" });

  try {
    const [rows] = await Post.findOne(id);
    if (!rows.length)
      return res.status(404).json({ message: "Post nie istnieje" });

    const folder = rows[0].zdjecia; // np. /uploads/posts/2
    const filePath = path.join(__dirname, "..", "public", folder, name);

    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      res.json({ message: "Zdjęcie usunięte" });
    } else {
      res.status(404).json({ message: "Plik nie istnieje" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Błąd serwera przy usuwaniu zdjęcia" });
  }
};
