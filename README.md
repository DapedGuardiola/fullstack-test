# Sistem Manajemen Transaksi

Aplikasi berbasis web menggunakan **NestJS** untuk mengelola data pelanggan dan transaksi dengan integrasi database MySQL serta server-side rendering menggunakan EJS.

---

## Project Preparation

Download Node.js dari website resmi:
https://nodejs.org/en/download

```bash
# install NestJS CLI
npm install -g @nestjs/cli

# install dependency project
npm install

# install dependency utama
npm install @nestjs/typeorm typeorm mysql2
npm install class-validator class-transformer
npm install ejs
npm install bcrypt
npm install -D @types/bcrypt
```

---
## Database Design

###  Entity Relationship Diagram (ERD)
![ERD](src/assets/entity_relationship_diagram.jpeg)


###  Class Diagram
![Class Diagram](src/assets/class_diagram.jpeg)
## Configuration

Konfigurasi database pada `app.module.ts`:

```ts
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'db_sales',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
});
```

Konfigurasi view engine (EJS) pada `main.ts`:

```ts
app.setViewEngine('ejs');
app.setBaseViewsDir('views');
```

---

## Running Application

```bash
# menjalankan aplikasi
npm run start:dev
```

Akses aplikasi:

```
http://localhost:3000
```
## Tampilan Aplikasi

### Login Page
![Class Diagram](src/assets/login_page.jpeg)

### Dashboard Page
![Class Diagram](src/assets/dashboard_page.jpeg)
---

## Example Usage

### Tambah Customer

```http
POST /customers/edit/1
```

Body:

```
name = Muhammad Satria
phone = 081123333121
```

Tampilan:

![Class Diagram](src/assets/customers_edit_page.jpeg)


---

### Tambah Transaksi

```http
POST /transaction/add/
```

Body:

```
order_number = INV-007
total_price = 100000
customerId = 1
```

Tampilan: 
![Class Diagram](src/assets/transaction_detail_page.jpeg)
---

## Other Features

* CRUD Customer
  
![Class Diagram](src/assets/customers_page.jpeg)

* CRUD Transaksi

![Class Diagram](src/assets/transaction_page.jpeg)

* Relasi Customer dengan Transaksi
* Validasi input (class-validator)

example:
<img width="940" height="562" alt="image" src="https://github.com/user-attachments/assets/dd44592a-a5ab-477f-81f0-1c629f429c20" />

keterangan : 
```
Validator dibuat dimasing" file dto, agar validasi dapat sesuai dengan object yang ada di dto tepat sebelum dimasukkan ke database.

dieksekusi dengan error exception try catch
```

* Password hashing (bcrypt)
<img width="618" height="302" alt="image" src="https://github.com/user-attachments/assets/1b100d09-67d5-4c30-b910-30cd843b1afb" />

* Server-side rendering (EJS)
<img width="567" height="274" alt="image" src="https://github.com/user-attachments/assets/688a6862-80d1-49a6-a337-e2af59a5c427" />

---

## Project Structure

```
src/
├── customers/
├── transaction/
├── auth/
├── entities/
└── main.ts

views/
├── customers_form.ejs
├── customers_list.ejs
├── auth_form.ejs
├── transaction_list.ejs
├── transaction_form.ejs
├── dashboard.ejs
├── users_list.ejs
├── transaction_detail.ejs
├── login.ejs

```

---

## Notes

* Gunakan **Body (x-www-form-urlencoded)** saat testing di Postman
* Jangan gunakan Query Params untuk POST
* Pastikan `customerId` valid saat membuat transaksi
* Password harus di-hash menggunakan bcrypt

---

## Contributing
Pull request diperbolehkan.
---
