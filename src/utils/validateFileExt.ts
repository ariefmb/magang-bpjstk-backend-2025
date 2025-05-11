export const validateFileExtensions = (
    file: Express.Multer.File | undefined,
    allowedExts: string[]
) => {
    if (!file) return true;
    const ext = file.originalname.split(".").pop()?.toLowerCase();
    return allowedExts.includes(ext || "");
};
