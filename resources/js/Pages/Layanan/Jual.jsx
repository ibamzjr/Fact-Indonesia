import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { usePage, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

const Jual = () => {
    const { packageId } = usePage().props ?? {};
    const [selectedPackage, setSelectedPackage] = useState(packageId || null);
    const [images, setImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { flash, errors } = usePage().props;

    // State untuk validasi
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    // Fungsi untuk validasi form
    const validateForm = () => {
        const errors = {};

        // Validasi field wajib
        const requiredFields = [
            "full_name",
            "birth_place_date",
            "address",
            "ktp_id",
            "phone_number",
            "npwp",
            "maps_link",
        ];

        requiredFields.forEach((field) => {
            if (!form.data[field]) {
                errors[field] = `${field.replace("_", " ")} harus diisi`;
            }
        });

        // Validasi KTP scan
        if (!form.data.ktp_scan) {
            errors.ktp_scan = "Scan KTP harus diunggah";
        }

        // Validasi jumlah gambar
        if (images.length !== 4) {
            errors.land_photos = `Anda harus mengunggah 4 gambar (saat ini: ${images.length})`;
        }

        // Validasi persetujuan syarat dan ketentuan
        if (!form.data.agree_terms) {
            errors.agree_terms = "Anda harus menyetujui syarat dan ketentuan";
        }

        setFormErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);

        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        if (packageId) {
            setSelectedPackage(packageId);
        }
        if (flash?.success) {
            setSuccessMessage(flash.success);
        }
        if (flash?.error) {
            setErrorMessage(flash.error);
        }
    }, [packageId, flash]);

    const [saveInfo, setSaveInfo] = useState(false);
    const form = useForm({
        package_id: selectedPackage || "",
        full_name: "",
        birth_place_date: "",
        address: "",
        ktp_id: "",
        phone_number: "",
        npwp: "",
        ktp_scan: null,
        land_photos: [],
        status: "Dijual",
        maps_link: "",
        agree_terms: false,
    });

    const handleFileUpload = (event) => {
        const files = event.target.files;
        if (files.length + images.length > 4) {
            setErrorMessage("Anda hanya bisa mengupload maksimal 4 gambar!");
            return;
        }
        handleFiles(files);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length + images.length > 4) {
            setErrorMessage("Anda hanya bisa mengupload maksimal 4 gambar!");
            return;
        }
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const validImages = [...images];
        let error = "";

        for (let file of files) {
            if (!file.type.startsWith("image/")) {
                error = "File harus berupa gambar (JPG, JPEG, PNG)";
                continue;
            }
            if (file.size > 2 * 1024 * 1024) {
                error = "Ukuran gambar maksimal 2MB";
                continue;
            }

            // Tambahkan metadata untuk penamaan file yang konsisten
            const cleanName = form.data.full_name
                .replace(/[^a-zA-Z0-9]/g, "")
                .toUpperCase();
            const imageNumber = validImages.length + 1;
            const extension = file.name.split(".").pop().toLowerCase();

            // Tambahkan metadata ke file object
            const fileWithMetadata = file;
            fileWithMetadata.customFileName = `property_temp_${cleanName}_${imageNumber}.${extension}`;

            const reader = new FileReader();
            reader.onloadend = () => {
                validImages.push({
                    file: fileWithMetadata,
                    preview: reader.result,
                    customFileName: fileWithMetadata.customFileName,
                });
                setImages([...validImages]);
                form.setData(
                    "land_photos",
                    validImages.map((img) => img.file)
                );
            };
            reader.readAsDataURL(file);
        }

        setErrorMessage(error);
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        form.setData(
            "land_photos",
            newImages.map((img) => img.file)
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        // Validasi form terlebih dahulu
        if (!validateForm()) {
            setErrorMessage("Mohon lengkapi semua data yang diperlukan");
            return;
        }

        const formData = new FormData();

        Object.keys(form.data).forEach((key) => {
            if (key !== "land_photos" && key !== "ktp_scan") {
                formData.append(key, form.data[key]);
            }
        });

        if (form.data.ktp_scan) {
            formData.append("ktp_scan", form.data.ktp_scan);
        }

        form.data.land_photos.forEach((file, index) => {
            formData.append(`land_photos[${index}]`, file);
        });

        if (selectedPackage) {
            formData.append("package_id", selectedPackage);
        }

        form.post("/jual-lahan", {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                form.reset();
                setImages([]);
                setSuccessMessage(
                    "Pengajuan lahan berhasil dikirim. Silakan tunggu konfirmasi admin."
                );
            },
            onError: (errors) => {
                console.error("Submission errors:", errors);
                const errorMessages = Object.entries(errors)
                    .map(([key, message]) => `${key}: ${message}`)
                    .join("\n");

                setErrorMessage(
                    `Gagal mengirim pengajuan. Silakan periksa kembali data Anda:\n${errorMessages}`
                );
            },
        });
    };

    // Tambahkan useEffect untuk validasi form setiap kali data berubah
    useEffect(() => {
        validateForm();
    }, [form.data, images]);

    return (
        <>
            <div className="max-w-8xl mx-auto bg-gradient-to-br from-white mb-8 rounded-3xl p-8 mt-8 shadow-xl">
                <div className="relative">
                    <Head title="Jual Lahan" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-bunulrejo rounded-full -mr-12 -mt-12 opacity-50 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-bunulrejo rounded-full -ml-12 -mb-12 opacity-30 blur-3xl"></div>

                    <div className="relative">
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-lowokwaru mb-2 mt-8 bg-clip-text text-transparent bg-gradient-to-r from-lowokwaru to-bunulrejo">
                            Jual Lahan
                        </h1>
                        <div className="inline-block bg-bunulrejo text-lowokwaru px-4 py-1 rounded-full text-sm font-semibold mb-6">
                            Paket{" "}
                            {selectedPackage
                                ? selectedPackage
                                : "Tidak ada paket terpilih"}
                        </div>
                    </div>

                    {successMessage && (
                        <div
                            className="bg-bunulrejo border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-lg shadow-md mb-6 animate-fadeIn"
                            role="alert"
                        >
                            <div className="flex items-center">
                                <svg
                                    className="h-6 w-6 text-green-500 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="block sm:inline font-medium">
                                    {successMessage}
                                </span>
                            </div>
                        </div>
                    )}

                    {errorMessage && (
                        <div
                            className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg shadow-md mb-6 animate-fadeIn"
                            role="alert"
                        >
                            <div className="flex items-center">
                                <svg
                                    className="h-6 w-6 text-red-500 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                                <span className="block sm:inline font-medium">
                                    {errorMessage}
                                </span>
                            </div>
                        </div>
                    )}

                    <p className="text-lg text-gray-700 mb-8 max-w-3xl">
                        Ingin mempromosikan Villa Anda? Silahkan lengkapi data
                        berikut untuk memulai proses penjualan. Kami akan
                        menghubungi Anda setelah data diverifikasi.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-2 gap-10 relative"
                >
                    <div className="space-y-6 bg-white p-8 rounded-2xl shadow-md">
                        <h2 className="text-2xl font-bold text-lowokwaru mb-6 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            Informasi Pribadi
                        </h2>

                        {[
                            {
                                name: "full_name",
                                label: "Nama Lengkap Sesuai KTP",
                            },
                            {
                                name: "birth_place_date",
                                label: "Tempat, Tanggal Lahir",
                            },
                            {
                                name: "address",
                                label: "Alamat",
                            },
                            {
                                name: "ktp_id",
                                label: "ID KTP",
                            },
                            {
                                name: "phone_number",
                                label: "Nomer HP",
                            },
                            {
                                name: "npwp",
                                label: "NPWP",
                            },
                            {
                                name: "maps_link",
                                label: "Link Google Maps Lokasi Lahan",
                                placeholder: "https://maps.google.com/...",
                            },
                        ].map((field, index) => (
                            <div key={index} className="relative">
                                <label className="block text-sm font-medium text-gray-700">
                                    {field.label}
                                </label>
                                <div className="mt-1 relative">
                                    {field.icon && (
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            {field.icon}
                                        </div>
                                    )}
                                    <input
                                        type="text"
                                        name={field.name}
                                        value={form[field.name]}
                                        onChange={(e) =>
                                            form.setData(
                                                field.name,
                                                e.target.value
                                            )
                                        }
                                        className={`mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 pl-${
                                            field.icon ? "10" : "3"
                                        }`}
                                        placeholder={
                                            field.placeholder ||
                                            `Masukkan ${field.label.toLowerCase()}`
                                        }
                                    />
                                </div>
                                {form.errors[field.name] && (
                                    <p className="text-red-500 text-sm">
                                        {form.errors[field.name]}
                                    </p>
                                )}
                            </div>
                        ))}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700">
                                Upload Scan Foto KTP
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        form.setData(
                                            "ktp_scan",
                                            e.target.files[0]
                                        )
                                    }
                                    className="mt-1 w-full text-gray-600 border border-gray-300 p-2 rounded-lg"
                                />
                                {form.errors.ktp_scan && (
                                    <p className="text-red-500 text-sm">
                                        {form.errors.ktp_scan}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={saveInfo}
                                onChange={() => setSaveInfo(!saveInfo)}
                                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <label className="text-sm text-gray-600">
                                Save this information for next time
                            </label>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-md">
                        <h2 className="text-2xl font-bold text-lowokwaru mb-6 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            Informasi Properti
                        </h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status Tanah *
                            </label>
                            <div className="flex gap-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Dijual"
                                        checked={form.data.status === "Dijual"}
                                        onChange={() =>
                                            form.setData("status", "Dijual")
                                        }
                                        className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                                    />
                                    <span className="ml-2 text-gray-700">
                                        Dijual
                                    </span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Disewa"
                                        checked={form.data.status === "Disewa"}
                                        onChange={() =>
                                            form.setData("status", "Disewa")
                                        }
                                        className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                                    />
                                    <span className="ml-2 text-gray-700">
                                        Disewa
                                    </span>
                                </label>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900">
                            Upload Gambar Tanah ({images.length}/4 Gambar)
                        </h3>
                        {formErrors.land_photos && (
                            <p className="text-red-500 text-sm">
                                {formErrors.land_photos}
                            </p>
                        )}
                        <div className="grid grid-cols-4 gap-4 mt-6">
                            {images.map((img, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={img.preview}
                                        alt="Preview"
                                        className="w-full h-24 object-cover rounded-lg border border-gray-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div
                            className="mt-6 border border-dashed border-gray-400 p-10 rounded-lg text-center cursor-pointer bg-gray-100"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                        >
                            <p className="text-gray-600">
                                Drag & drop gambar atau klik untuk memilih
                            </p>
                            <p className="text-gray-500 text-sm">
                                Hanya menerima format JPG, JPEG, PNG (Maks 2MB)
                            </p>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileUpload}
                            className="mt-4 block w-full border border-gray-300 p-2 rounded-lg"
                        />
                        <div className="mt-6">
                            <label
                                className={`inline-flex items-center ${
                                    formErrors.agree_terms
                                        ? "text-red-600"
                                        : "text-gray-700"
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={form.data.agree_terms}
                                    onChange={(e) =>
                                        form.setData(
                                            "agree_terms",
                                            e.target.checked
                                        )
                                    }
                                    className={`h-4 w-4 ${
                                        formErrors.agree_terms
                                            ? "border-red-500 text-red-600"
                                            : "border-gray-300 text-green-600"
                                    } rounded focus:ring-green-500`}
                                />
                                <span className="ml-2 text-sm">
                                    <strong>Dengan ini saya menyatakan</strong>{" "}
                                    bahwa data yang saya berikan adalah benar
                                    dan saya menyetujui syarat dan ketentuan
                                    yang ada.
                                </span>
                            </label>
                            {formErrors.agree_terms && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formErrors.agree_terms}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={`mt-4 px-6 py-3 text-white rounded-lg transition ${
                                isFormValid
                                    ? "bg-green-700 hover:bg-green-800"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                            disabled={!isFormValid || form.processing}
                        >
                            {form.processing ? "Mengirim..." : "Kirim"}
                        </button>
                        {/* Tambahkan pesan bantuan */}
                        {!isFormValid && (
                            <p className="text-sm text-gray-600 mt-2">
                                Mohon lengkapi semua data yang diperlukan dan
                                unggah 4 gambar tanah
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};
Jual.layout = (page) => <MainLayout children={page} />;
export default Jual;
