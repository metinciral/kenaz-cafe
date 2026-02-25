import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Cafe info - static content
export const cafeInfo = {
  name: "Kenaz Cafe",
  tagline: "Nilüfer'in En Akışkan İnterneti ve En Taze Lezzetleri",
  description: "Kenaz, İskandinav mitolojisinde aydınlanmanın, bilgiye açılan kapıların ve yaratıcı enerjinin simgesidir. Biz de Kenaz Cafe olarak, bu mistik enerjiyi her fincana taşıyor ve konforlu bir ortamda kahve keyfi yaşatıyoruz.",
  
  features: [
    {
      icon: "wifi",
      title: "Yüksek Hızlı İnternet",
      description: "Kesintisiz çalışma için fiber internet altyapısı"
    },
    {
      icon: "plug",
      title: "Her Alanda Priz",
      description: "Rahatça çalışabilmeniz için stratejik priz noktaları"
    },
    {
      icon: "sun",
      title: "Doğal Aydınlatma",
      description: "Geniş pencereler ve açık alan tasarımı"
    },
    {
      icon: "volume-x",
      title: "Sessiz Ortam",
      description: "AVM gürültüsünden uzak, huzurlu atmosfer"
    }
  ],
  
  workspaceHighlights: [
    "Home office çalışanları için ideal",
    "Şehir hayatının yoğunluğundan uzak",
    "Yaratıcı fikirlerinize odaklanın",
    "Rahat çalışma köşeleri"
  ],
  
  menuItems: [
    "Lezzetli kahve çeşitleri",
    "Özenle hazırlanmış sandviçler",
    "Taptaze kruvasanlar",
    "Nefis tatlılar"
  ],
  
  contact: {
    address: "Nilüfer, Bursa",
    phone: "0 530 248 8032",
    email: "info@kenazcafe.com.tr",
    instagram: "https://www.instagram.com/kenazcafe",
    googleMaps: "https://www.google.com/maps/place/Kenaz+Cafe+-+Nil%C3%BCfer/@40.2240551,28.9660435,17z/data=!3m1!4b1!4m6!3m5!1s0x14ca17df2bcbfea1:0x7dd221015740121f!8m2!3d40.224051!4d28.9686184!16s%2Fg%2F11w39q4_c5?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D",
    menuUrl: "https://qr-menu.simprasuite.com/kafe-kenaz/2/menu/1d29e42a-c0fc-47fc-8d48-83aae2cfafd3"
  },
  
  hours: {
    weekdays: "08:00 - 22:00",
    weekend: "09:00 - 23:00"
  }
};

// API function for reservation submission
export const submitReservation = async (formData) => {
  try {
    const response = await axios.post(`${API}/reservations`, formData);
    return { success: true, data: response.data, message: "Rezervasyonunuz alındı!" };
  } catch (error) {
    console.error("Reservation submission error:", error);
    
    // Handle validation errors
    if (error.response?.status === 400) {
      return { 
        success: false, 
        message: error.response.data.detail || "Lütfen bilgilerinizi kontrol edin" 
      };
    }
    
    // Handle server errors
    return { 
      success: false, 
      message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin." 
    };
  }
};

// API function to get all reservations (admin use)
export const getReservations = async (status = null) => {
  try {
    const url = status ? `${API}/reservations?status=${status}` : `${API}/reservations`;
    const response = await axios.get(url);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return { success: false, message: "Rezervasyonlar yüklenemedi" };
  }
};
