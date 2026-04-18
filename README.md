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

Entity Relationship Diagram
###  Entity Relationship Diagram (ERD)
![ERD](./src/assets/entity_relationship_diagram.jpg)


Class Diagram
###  Class Diagram
![Class Diagram](./src/assets/class_diagram.jpg)
## Configuration

Konfigurasi database pada `app.module.ts`:

```ts
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'db_transaksi',
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

---

## Example Usage

### Tambah Customer

```http
POST /customers/add
```

Body:

```
name = Budi
phone = 08123456789
```

---

### Tambah Transaksi

```http
POST /transaction/add
```

Body:

```
order_number = INV-001
total_price = 100000
customerId = 1
```

---

## Features

* CRUD Customer
* CRUD Transaksi
* Relasi Customer dengan Transaksi
* Validasi input (class-validator)
* Password hashing (bcrypt)
* Server-side rendering (EJS)

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
├── transaction_list.ejs
```

---

## Notes

* Gunakan **Body (x-www-form-urlencoded)** saat testing di Postman
* Jangan gunakan Query Params untuk POST
* Pastikan `customerId` valid saat membuat transaksi
* Password harus di-hash menggunakan bcrypt

---

## Contributing

Pull request diperbolehkan. Untuk perubahan besar, silakan buat issue terlebih dahulu untuk diskusi.

---

## License

MIT
