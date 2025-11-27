export const normalizePublicIdFromUrl = (value) => { // url de la imagen: https://res.cloudinary.com/demo/image/upload/v1312461204/news/1231-234234-2342-23423.jpg
  if (!value) return null

  // Caso 1: Ya es un public_id válido sin slash y sin dominio
  if (!value.includes("http") && !value.includes("upload/")) {
    // filename: 1231-234234-2342-23423.jpg o 1231-234234-2342-23423
    return value.replace(/\.[a-zA-Z0-9]+$/, '') // quitar extensión si existe
  }

  // Caso 2: Es una URL
  try {
    // 1. Obtener la parte después de "/upload/"
    const parts = value.split("/upload/")
    if (parts.length < 2) return null

    let id = parts[1]

    // 2. Remover versión si está presente: v123456/
    id = id.replace(/^v[0-9]+\//, '')

    // 3. Eliminar transformaciones (q_auto,f_auto etc.)
    // Se detectan porque vienen ANTES de la versión
    if (id.includes("/v")) {
      id = id.substring(id.indexOf("/v") + 2)
      id = id.replace(/^[0-9]+\//, '') // quitar versión
    }

    // 4. Quitar parámetros "?..."
    id = id.split("?")[0]

    // 5. Quitar extensión (jpg, png, webp, etc.)
    id = id.replace(/\.[a-zA-Z0-9]+$/, '')

    return id // news/1231-234234-2342-23423
  } catch {
    return null
  }
}