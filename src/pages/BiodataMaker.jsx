import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  User,
  Briefcase,
  Users,
  Download,
  Camera,
  Sparkles,
  ShieldCheck,
  Layout,
  Moon,
  Eye,
  Trash2,
  Heart,
  Star,
  FileText,
  CheckCircle2,
  ArrowRight,
  X,
  Loader2,
} from "lucide-react";
import SeoHead from "../components/SeoHead";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image as PdfImage,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// 🟢 PERFORMANCE: Lazy Load the PDF engine
const PDFViewer = lazy(() =>
  import("@react-pdf/renderer").then((mod) => ({ default: mod.PDFViewer })),
);

// 🟢 POLYFILLS
import { Buffer } from "buffer";
if (typeof window !== "undefined") {
  window.Buffer = window.Buffer || Buffer;
}

// 🟢 ASSETS
import ganeshaBg from "../assets/ganesha-bg.jpg";
import minimalBg from "../assets/minimal-bg.jpg";
import swastikBg from "../assets/swastik-bg.jpg";

// 🟢 SEO DATA
const biodataFaqs = [
  {
    "@type": "Question",
    name: "How to create a marriage biodata for free?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Fill the form, pick a template, and download your professional PDF instantly for free.",
    },
  },
  {
    "@type": "Question",
    name: "Is my personal data saved?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "No. SnapSizes processes all data locally in your browser. It is never uploaded to any server.",
    },
  },
];

// ==========================================
// 📄 1. THE NATIVE PDF STYLESHEET (LOCKED)
// ==========================================
const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    position: "relative",
  },
  ganeshaPage: {
    paddingTop: 280,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 60,
    fontFamily: "Helvetica",
  },
  minimalPage: {
    paddingTop: 70,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 70,
    fontFamily: "Helvetica",
  },
  swastikPage: {
    paddingTop: 110,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 110,
    fontFamily: "Helvetica",
  },
  absoluteBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  bgImage: { width: "100%", height: "100%", objectFit: "stretch" },
  header: {
    borderBottom: "2px solid #f59e0b",
    paddingBottom: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    color: "#1e293b",
    marginBottom: 4,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 9,
    color: "#d97706",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  mainContent: { flexDirection: "row", gap: 20 },
  leftCol: { width: "30%" },
  rightCol: { width: "70%" },
  photoBox: {
    width: 110,
    height: 140,
    backgroundColor: "#f1f5f9",
    border: "1px solid #e2e8f0",
    marginBottom: 15,
  },
  photo: { width: "100%", height: "100%", objectFit: "cover" },
  section: { marginBottom: 15 },
  sectionTitle: {
    fontSize: 10,
    color: "#d97706",
    borderBottom: "1px solid #fde68a",
    paddingBottom: 3,
    marginBottom: 8,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  row: { flexDirection: "row", marginBottom: 4 },
  label: { width: 110, fontSize: 9, color: "#64748b", fontWeight: "bold" },
  value: { flex: 1, fontSize: 9, color: "#1e293b" },
});

const DataRow = ({ label, value }) => {
  if (!value || value.trim() === "") return null;
  return (
    <View style={pdfStyles.row}>
      <Text style={pdfStyles.label}>{label}</Text>
      <Text style={pdfStyles.value}>{value}</Text>
    </View>
  );
};

const BiodataPDFDocument = ({ data, template }) => {
  let activeStyle = pdfStyles.page;
  if (template === "ganesha") activeStyle = pdfStyles.ganeshaPage;
  if (template === "minimal") activeStyle = pdfStyles.minimalPage;
  if (template === "swastik") activeStyle = pdfStyles.swastikPage;

  return (
    <Document title={`${data.fullName || "Marriage_Biodata"}`}>
      <Page size="A4" style={activeStyle}>
        <View style={pdfStyles.absoluteBackground}>
          {template === "ganesha" && (
            <PdfImage src={ganeshaBg} style={pdfStyles.bgImage} />
          )}
          {template === "minimal" && (
            <PdfImage src={minimalBg} style={pdfStyles.bgImage} />
          )}
          {template === "swastik" && (
            <PdfImage src={swastikBg} style={pdfStyles.bgImage} />
          )}
        </View>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.name}>{data.fullName || "FULL NAME"}</Text>
          <Text style={pdfStyles.subtitle}>Marriage Biodata</Text>
        </View>
        <View style={pdfStyles.mainContent}>
          <View style={pdfStyles.leftCol}>
            <View style={pdfStyles.photoBox}>
              {data.photo && (
                <PdfImage src={data.photo} style={pdfStyles.photo} />
              )}
            </View>
          </View>
          <View style={pdfStyles.rightCol}>
            <View style={pdfStyles.section}>
              <Text style={pdfStyles.sectionTitle}>
                Personal & Astrological
              </Text>
              <DataRow
                label="DOB"
                value={
                  data.dob
                    ? `${data.dob} ${data.age ? `(${data.age} Yrs)` : ""}`
                    : ""
                }
              />
              <DataRow label="Time of Birth" value={data.timeOfBirth} />
              <DataRow label="Place of Birth" value={data.placeOfBirth} />
              <DataRow label="Height" value={data.height} />
              <DataRow label="Blood Group" value={data.bloodGroup} />
              <DataRow
                label="Religion / Caste"
                value={
                  data.religion && data.caste
                    ? `${data.religion} / ${data.caste}`
                    : data.religion || data.caste
                }
              />
              <DataRow label="Gotra" value={data.gotra} />
              <DataRow label="Manglik Status" value={data.manglik} />
              <DataRow label="Marital Status" value={data.maritalStatus} />
            </View>
            <View style={pdfStyles.section}>
              <Text style={pdfStyles.sectionTitle}>Education & Career</Text>
              <DataRow label="Education" value={data.education} />
              <DataRow label="Profession" value={data.profession} />
              <DataRow label="Workplace" value={data.company} />
              <DataRow label="Annual Income" value={data.income} />
              <DataRow label="Work Location" value={data.location} />
            </View>
            <View style={pdfStyles.section}>
              <Text style={pdfStyles.sectionTitle}>Family Background</Text>
              <DataRow label="Father's Name" value={data.fatherName} />
              <DataRow label="Mother's Name" value={data.motherName} />
              <DataRow label="Siblings" value={data.siblings} />
              <DataRow label="Native Place" value={data.nativePlace} />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// ==========================================
// 💻 3. MAIN REACT UI COMPONENT
// ==========================================
export default function BiodataMaker() {
  const getInitialData = () => {
    const saved = localStorage.getItem("biodata_v4_locked");
    return saved
      ? JSON.parse(saved)
      : {
          fullName: "",
          dob: "",
          timeOfBirth: "",
          placeOfBirth: "",
          age: "",
          height: "",
          bloodGroup: "",
          religion: "",
          caste: "",
          gotra: "",
          manglik: "",
          maritalStatus: "",
          education: "",
          profession: "",
          company: "",
          income: "",
          location: "",
          fatherName: "",
          fatherOcc: "",
          motherName: "",
          motherOcc: "",
          siblings: "",
          nativePlace: "",
          photo: null,
        };
  };

  const [formData, setFormData] = useState(getInitialData);
  const [template, setTemplate] = useState("ganesha");
  const [showPreview, setShowPreview] = useState(false);
  const [isPreviewInitialized, setIsPreviewInitialized] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    localStorage.setItem("biodata_v4_locked", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const handleScroll = () => setIsScrolling(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "dob" ? { age: calculateAge(value) } : {}),
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData((prev) => ({ ...prev, photo: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    if (window.confirm("Clear all data?")) {
      const reset = {
        fullName: "",
        dob: "",
        timeOfBirth: "",
        placeOfBirth: "",
        age: "",
        height: "",
        bloodGroup: "",
        religion: "",
        caste: "",
        gotra: "",
        manglik: "",
        maritalStatus: "",
        education: "",
        profession: "",
        company: "",
        income: "",
        location: "",
        fatherName: "",
        fatherOcc: "",
        motherName: "",
        motherOcc: "",
        siblings: "",
        nativePlace: "",
        photo: null,
      };
      setFormData(reset);
      localStorage.removeItem("biodata_v4_locked");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 overflow-hidden relative">
      <SeoHead
        title="Premium Marriage Biodata Maker"
        description="Create and download professional Indian marriage biodata for free. Premium templates for Ganesha & Swastik styles."
        customFaqs={biodataFaqs}
      />

      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-150 overflow-hidden z-0 pointer-events-none opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-125 h-125 rounded-full bg-amber-400/20 blur-[80px]"></div>
        <div className="absolute top-[10%] -right-[10%] w-100 h-100 rounded-full bg-orange-400/20 blur-[80px]"></div>
      </div>

      <main className="relative z-20 max-w-7xl mx-auto px-4 pt-12 md:pt-20">
        {/* 🟢 HERO SECTION (Top-most element now) */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-[10px] font-black uppercase tracking-widest mb-6">
            <Sparkles size={14} /> 100% Private & Free
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6 uppercase">
            Marriage{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">
              Biodata Maker
            </span>
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
            Create a stunning, culturally rich biodata for marriage in seconds.
            Choose from premium templates and download your professional PDF
            instantly.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT: FULL FORM FIELDS */}
          <div
            className={`flex-1 space-y-6 ${showPreview ? "hidden lg:block" : "block"}`}
          >
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white shadow-sm flex items-start gap-4">
              <ShieldCheck className="text-amber-500 shrink-0" size={24} />
              <div>
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">
                  Smart-Delete Provision
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Empty fields are automatically removed from the document. Fill
                  only what you wish to share.
                </p>
              </div>
            </div>

            <Section
              title="Photo & Basic Details"
              icon={<Camera className="text-indigo-500" size={18} />}
            >
              <div className="flex items-center gap-4 mb-8 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                {formData.photo ? (
                  <img
                    src={formData.photo}
                    className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-slate-200 flex items-center justify-center">
                    <User className="text-slate-400" size={32} />
                  </div>
                )}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="text-xs font-bold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-slate-900 file:text-white file:text-[10px] file:font-black cursor-pointer hover:file:bg-slate-800 transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="E.g. Rahul Kumar"
                />
                <Input
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
                <Input
                  label="Height"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="E.g. 5'11\"
                />
                <Input
                  label="Blood Group"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  placeholder="E.g. B+"
                />
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Marital Status
                  </label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:border-amber-500"
                  >
                    <option value="">Select Status</option>
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                </div>
              </div>
            </Section>

            <Section
              title="Religious & Astrological"
              icon={<Moon className="text-purple-500" size={18} />}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Religion"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                />
                <Input
                  label="Caste"
                  name="caste"
                  value={formData.caste}
                  onChange={handleInputChange}
                />
                <Input
                  label="Gotra"
                  name="gotra"
                  value={formData.gotra}
                  onChange={handleInputChange}
                />
                <Input
                  label="Place of Birth"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleInputChange}
                />
                <Input
                  label="Time of Birth"
                  name="timeOfBirth"
                  value={formData.timeOfBirth}
                  onChange={handleInputChange}
                  placeholder="E.g. 10:45 AM"
                />
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Manglik Status
                  </label>
                  <select
                    name="manglik"
                    value={formData.manglik}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm font-bold outline-none"
                  >
                    <option value="">Select Option</option>
                    <option value="Non-Manglik">Non-Manglik</option>
                    <option value="Manglik">Manglik</option>
                  </select>
                </div>
              </div>
            </Section>

            <Section
              title="Education & Career"
              icon={<Briefcase className="text-blue-500" size={18} />}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                />
                <Input
                  label="Profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                />
                <Input
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
                <Input
                  label="Annual Income"
                  name="income"
                  value={formData.income}
                  onChange={handleInputChange}
                />
              </div>
            </Section>

            <Section
              title="Family Details"
              icon={<Users className="text-rose-500" size={18} />}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Father's Name"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                />
                <Input
                  label="Mother's Name"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                />
                <Input
                  label="Siblings"
                  name="siblings"
                  value={formData.siblings}
                  onChange={handleInputChange}
                />
                <Input
                  label="Native Place"
                  name="nativePlace"
                  value={formData.nativePlace}
                  onChange={handleInputChange}
                />
              </div>
            </Section>

            {/* Template Selector */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative transition-all hover:shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                  <Layout size={18} className="text-indigo-500" /> Choose Style
                </h3>
                <button
                  onClick={resetForm}
                  className="text-[10px] font-black text-rose-500 uppercase flex items-center gap-1 hover:bg-rose-50 px-3 py-1.5 rounded-full"
                >
                  <Trash2 size={12} /> Reset Form
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["minimal", "ganesha", "swastik"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTemplate(t)}
                    className={`py-4 rounded-2xl border-2 text-[10px] font-black uppercase transition-all ${template === t ? "border-amber-500 bg-amber-50 text-amber-600 shadow-inner" : "border-slate-100 text-slate-400 hover:border-slate-200"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: STICKY DESKTOP PREVIEW */}
          <aside className="hidden lg:block w-100 xl:w-120">
            <div className="sticky top-28 space-y-4">
              <div className="flex justify-between items-center px-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Eye size={14} /> Live Document Preview
                </h3>
                <PDFDownloadLink
                  document={
                    <BiodataPDFDocument data={formData} template={template} />
                  }
                  fileName={`${formData.fullName || "Biodata"}.pdf`}
                  className="text-[10px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors"
                >
                  {({ loading }) =>
                    loading ? "Generating..." : "Download Now"
                  }
                </PDFDownloadLink>
              </div>

              <div className="h-[75vh] bg-slate-900 rounded-[3rem] p-2 shadow-2xl overflow-hidden border-8 border-slate-900 shadow-amber-500/10 transition-all duration-500 relative">
                {!isPreviewInitialized ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-800 rounded-[2.5rem]">
                    <Eye size={32} className="text-amber-500 mb-4" />
                    <h4 className="text-white font-black text-xs uppercase tracking-widest mb-2">
                      Engine Suspended
                    </h4>
                    <p className="text-slate-400 text-[10px] font-medium mb-6 leading-relaxed">
                      Start the live preview engine to see your changes in
                      real-time.
                    </p>
                    <button
                      onClick={() => setIsPreviewInitialized(true)}
                      className="px-6 py-3 bg-white text-slate-900 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all"
                    >
                      Start Engine
                    </button>
                  </div>
                ) : (
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center h-full text-white">
                        <Loader2 className="animate-spin" />
                      </div>
                    }
                  >
                    <PDFViewer
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        borderRadius: "2rem",
                      }}
                      showToolbar={false}
                    >
                      <BiodataPDFDocument data={formData} template={template} />
                    </PDFViewer>
                  </Suspense>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* 🟢 STEP-BY-STEP GUIDES */}
        <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            icon={<FileText className="text-amber-500" />}
            step="01"
            title="Fill Details"
            desc="Enter your personal, educational, and family background into the form."
          />
          <StepCard
            icon={<Star className="text-indigo-500" />}
            step="02"
            title="Pick a Style"
            desc="Choose from premium templates like Ganesha or Minimal."
          />
          <StepCard
            icon={<CheckCircle2 className="text-emerald-500" />}
            step="03"
            title="Save PDF"
            desc="Preview your biodata and download the high-quality PDF instantly."
          />
        </section>

        {/* 🟢 CROSS-TOOL PROMOTION */}
        <section className="mt-24 bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <Heart
            className="mx-auto text-amber-500 mb-6"
            size={48}
            fill="currentColor"
          />
          <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">
            Need a Perfect Photo?
          </h3>
          <p className="text-slate-400 font-medium mb-8 max-w-xl mx-auto">
            Use our Bulk Photo Resizer to crop your profile picture to the
            perfect 4x6 ratio before adding it to your biodata.
          </p>
          <a
            href="/bulk-photo-resizer"
            className="inline-block bg-white text-slate-900 px-10 py-4 rounded-full font-black text-xs uppercase hover:scale-105 transition-all shadow-xl group"
          >
            Launch Resizer{" "}
            <ArrowRight
              size={14}
              className="inline-block ml-1 group-hover:translate-x-1 transition-transform"
            />
          </a>
        </section>

        {/* 🟢 FULL SEO ARTICLE SECTION (LOCKED) */}
        <article className="mt-24 max-w-4xl mx-auto border-t border-slate-200 pt-20 pb-20">
          <div className="prose prose-slate max-w-none text-slate-600">
            <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight text-center uppercase">
              The Ultimate Marriage Biodata Maker
            </h2>
            <p className="text-lg leading-relaxed mb-6 font-medium">
              A marriage biodata is more than just a document; it is your first
              introduction to a potential life partner and their family. In
              Indian culture, it acts as a digital or physical bridge that
              summarizes your professional achievements, personal values, and
              ancestral roots.
            </p>
            <p className="leading-relaxed mb-6">
              Using the <strong>SnapSizes Marriage Biodata Maker</strong>, you
              can create a high-quality, professional document in minutes. Our
              tool is specifically designed to meet the requirements of modern
              Indian families, combining traditional respect with modern
              professional standards.
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 uppercase tracking-tight border-b pb-4">
              Why Choose SnapSizes for Your Biodata?
            </h3>
            <ul className="space-y-4 mb-10 list-disc pl-6 text-sm font-medium">
              <li>
                <strong>100% Privacy Guaranteed:</strong> All your personal,
                career, and family information is processed locally in your
                browser. This ensures your sensitive information never touches
                our servers.
              </li>
              <li>
                <strong>Premium AI Templates:</strong> Choose from culturally
                rich designs like the Ganesha template, the auspicious Swastik
                border, or a modern Minimalist layout.
              </li>
              <li>
                <strong>Smart-Delete Logic:</strong> No more awkward empty
                spaces. If you don't have certain details, simply leave them
                blank and our engine will automatically remove those lines.
              </li>
              <li>
                <strong>Mobile-First Design:</strong> Our tool works perfectly
                on smartphones, allowing you to fill details and preview your
                document with a native app-like experience.
              </li>
            </ul>
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight text-center uppercase">
                Frequently Asked Questions
              </h2>
              {biodataFaqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-amber-100 transition-colors shadow-sm group"
                >
                  <h4 className="font-black text-slate-900 text-sm mb-3 group-hover:text-amber-500 transition-colors uppercase tracking-tight">
                    {faq.name}
                  </h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>

      {/* 🟢 SMART MOBILE FAB (Z-INDEX & INSPECTOR FIXED) */}
      <div
        className={`lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 transition-all duration-500 ${isScrolling ? "scale-100 opacity-100" : "scale-95 opacity-90"}`}
      >
        <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-3 shadow-2xl flex items-center gap-2">
          <button
            onClick={() => {
              setShowPreview(true);
              setIsPreviewInitialized(true);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white/10 text-white rounded-[1.8rem] text-[10px] font-black uppercase active:scale-95 transition-all"
          >
            {showPreview ? (
              <>
                <X size={16} /> Close
              </>
            ) : (
              <>
                <Eye size={16} /> Preview
              </>
            )}
          </button>
          <PDFDownloadLink
            document={
              <BiodataPDFDocument data={formData} template={template} />
            }
            fileName="Biodata.pdf"
            className="flex-[1.5] flex items-center justify-center gap-2 py-4 bg-amber-500 text-white rounded-[1.8rem] text-[10px] font-black uppercase shadow-lg active:scale-95 transition-all"
          >
            <Download size={16} /> Download PDF
          </PDFDownloadLink>
        </div>
      </div>

      {/* 🟢 FULL SCREEN OVERLAY (LOCKED HEIGHT FIX FOR MOBILE/INSPECTOR) */}
      {showPreview && (
        <div className="lg:hidden fixed inset-0 z-60 bg-slate-900 flex flex-col h-screen w-screen animate-in fade-in duration-200 overflow-hidden">
          <div className="p-4 flex justify-between items-center border-b border-white/10 shrink-0">
            <span className="text-white text-[10px] font-black uppercase tracking-widest">
              Document Preview
            </span>
            <button
              onClick={() => setShowPreview(false)}
              className="text-white p-2 bg-white/10 rounded-full active:scale-90"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 relative bg-slate-800 p-2">
            <div className="absolute inset-2 overflow-hidden rounded-2xl">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full text-white">
                    <Loader2 className="animate-spin" />
                  </div>
                }
              >
                <PDFViewer
                  style={{ width: "100%", height: "100%", border: "none" }}
                  showToolbar={false}
                >
                  <BiodataPDFDocument data={formData} template={template} />
                </PDFViewer>
              </Suspense>
            </div>
          </div>

          <div className="p-4 bg-slate-900 border-t border-white/10 shrink-0">
            <PDFDownloadLink
              document={
                <BiodataPDFDocument data={formData} template={template} />
              }
              fileName="Biodata.pdf"
              className="w-full py-4 bg-amber-500 text-white rounded-2xl font-black text-xs uppercase text-center active:scale-95 transition-all"
            >
              Download PDF
            </PDFDownloadLink>
          </div>
        </div>
      )}

      <footer className="mt-24 pt-12 border-t border-slate-200 px-4 text-center bg-white relative z-10">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest max-w-2xl mx-auto leading-loose pb-8">
          Privacy Policy: SnapSizes processes all data locally in your browser.
          All content is protected by our global security framework.
        </p>
      </footer>
    </div>
  );
}

// 🟢 INTERNAL HELPERS
function Section({ title, icon, children }) {
  return (
    <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm transition-all hover:shadow-md">
      <h2 className="text-sm font-black uppercase mb-6 border-b pb-4 flex items-center gap-2 tracking-tight">
        {icon} {title}
      </h2>
      {children}
    </section>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      <input
        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:border-amber-500 focus:bg-white transition-all placeholder:text-slate-300"
        {...props}
      />
    </div>
  );
}

function StepCard({ icon, step, title, desc }) {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group">
      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
        {icon}
      </div>
      <span className="text-5xl font-black text-slate-100 mb-2 group-hover:text-amber-500/20 transition-all duration-500">
        {step}
      </span>
      <h4 className="text-lg font-black text-slate-900 mb-2 uppercase group-hover:text-amber-500 transition-colors">
        {title}
      </h4>
      <p className="text-slate-500 text-sm font-medium leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
