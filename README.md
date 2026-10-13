
# TaskFlow - Görev Yönetim Uygulaması

TaskFlow, React ve JavaScript kullanılarak geliştirilmiş modern ve kullanıcı dostu bir görev yönetim uygulamasıdır.

Bu proje, Web Geliştirme JavaScript eğitimi kapsamında hazırlanmıştır. React ile CRUD işlemleri, state yönetimi, form validasyonu ve LocalStorage kullanımını öğrenmek amacıyla geliştirilmiştir.

## Özellikler

- Dashboard üzerinden görev istatistiklerini görüntüleme
- Yeni görev oluşturma
- Mevcut görevleri listeleme
- Görev bilgilerini düzenleme
- Onay modalı ile görev silme
- Görev başlığına göre arama
- Durum ve önceliğe göre filtreleme
- Tarihe göre sıralama
- Form validasyonları ve hata mesajları
- Başarılı işlemler için Toast bildirimleri
- LocalStorage ile verileri saklama
- Responsive tasarım

## Kullanılan Teknolojiler

| Teknoloji | Kullanım Amacı |
|-----------|----------------|
| React | Kullanıcı arayüzü |
| JavaScript | Uygulama işlevleri |
| Vite | Proje geliştirme ve derleme |
| Tailwind CSS | Arayüz tasarımı |
| React Router | Sayfa yönlendirmeleri |
| LocalStorage | Tarayıcıda veri saklama |
| Git & GitHub | Versiyon kontrolü |

## Uygulama Ekranları

### Dashboard

Dashboard ekranında:

- Toplam görev sayısı
- Bekleyen görev sayısı
- Tamamlanan görev sayısı
- Görev tamamlanma oranı
- Son eklenen görevler

görüntülenir.

### Görevler

Görevler sayfasında görev ekleme, listeleme, güncelleme ve silme işlemleri yapılabilir.

Her görev aşağıdaki bilgileri içerir:

- Başlık
- Açıklama
- Sorumlu kişi
- Öncelik
- Durum
- Oluşturulma tarihi

## Proje Klasör Yapısı

```text
src/
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.jsx
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   └── ui/
│       ├── ConfirmModal.jsx
│       ├── StatCard.jsx
│       ├── TaskModal.jsx
│       └── Toast.jsx
├── data/
│   └── tasks.js
├── pages/
│   ├── Dashboard.jsx
│   └── Tasks.jsx
├── validations/
│   └── taskValidation.js
├── App.jsx
├── index.css
└── main.jsx
```

## Kurulum

Projeyi bilgisayarınıza indirin:

```bash
git clone https://github.com/onuraydinoglu/taskflow-frontend.git
```

Proje klasörüne girin:

```bash
cd taskflow-frontend
```

Gerekli paketleri yükleyin:

```bash
npm install
```

Projeyi başlatın:

```bash
npm run dev
```

Terminalde gösterilen yerel adres üzerinden uygulamayı açabilirsiniz.

## Kullanılabilir Komutlar

```bash
npm run dev
```
Geliştirme sunucusunu başlatır.

```bash
npm run build
```
Üretim için proje derlemesini oluşturur.

```bash
npm run preview
```
Üretim derlemesini yerel ortamda görüntüler.

```bash
npm run lint
```
ESLint kontrollerini çalıştırır.

## Veri Saklama

TaskFlow uygulamasında backend veya veritabanı bağlantısı bulunmamaktadır.

Görevler React state ile yönetilir ve LocalStorage üzerinde saklanır.

Sayfa yenilendiğinde kullanıcı tarafından eklenen, düzenlenen veya silinen görevlerin durumu korunur.

Veriler yalnızca ilgili tarayıcıda saklanır. Farklı cihazlar arasında otomatik senkronizasyon yapılmaz.

## Form Validasyonu

Görev ekleme ve düzenleme işlemlerinde form doğrulamaları kullanılmaktadır.

Validasyon işlemleri `src/validations/taskValidation.js` dosyasında bulunmaktadır.

- Görev başlığı: 3-100 karakter
- Açıklama: 10-500 karakter
- Sorumlu kişi: 2-50 karakter
- Öncelik: Düşük, Orta veya Yüksek
- Durum: Bekliyor veya Tamamlandı

Hatalı alanlarda kullanıcıya açıklayıcı mesajlar gösterilmektedir.

## Ekran Görüntüleri

Dashboard ve Görevler ekranlarının görselleri daha sonra eklenecektir.

## Geliştirici

**Onur Aydınoğlu**

GitHub: [github.com/onuraydinoglu](https://github.com/onuraydinoglu)

## Proje

[TaskFlow Frontend GitHub Reposu](https://github.com/onuraydinoglu/taskflow-frontend)

## Lisans

Bu proje eğitim amacıyla geliştirilmiştir. Henüz bir lisans dosyası eklenmemiştir.
