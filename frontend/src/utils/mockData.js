// Mock data for Kenaz Cafe website

export const cafeInfo = {
  name: "Kenaz Cafe",
  tagline: "Aydınlanmanın ve Yaratıcılığın Buluşma Noktası",
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
    phone: "+90 XXX XXX XX XX",
    email: "info@kenazcafe.com.tr",
    instagram: "https://www.instagram.com/kenazcafe",
    googleMaps: "https://www.google.com/maps/place/Kenaz+Cafe+-+Nil%C3%BCfer/@40.2240551,28.9660435,17z/data=!3m1!4b1!4m6!3m5!1s0x14ca17df2bcbfea1:0x7dd221015740121f!8m2!3d40.224051!4d28.9686184!16s%2Fg%2F11w39q4_c5?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D",
    menuUrl: "#menu" // Placeholder for menu link
  },
  
  hours: {
    weekdays: "08:00 - 22:00",
    weekend: "09:00 - 23:00"
  }
};

// Mock function for reservation submission
export const submitReservation = async (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock reservation submitted:", formData);
      resolve({ success: true, message: "Rezervasyonunuz alındı!" });
    }, 1000);
  });
};
