"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaksiId = "TRX-000001";

    await queryInterface.bulkInsert("Transaksis", [
      {
        id: transaksiId,
        jenisTransaksi: "Barang Keluar",
        lokasi: "Jakarta",
        nomorSurat: "024/00108.00/04/2026",
        tanggal: "2026-04-28",
        pengirimInstansi: "",
        pengirimNama: "Ahmad Dendy Syaputra",
        pengirimJabatan: "Staff Pengadaan dan Logistik",
        penerimaInstansi: "CP SUDIRMAN",
        penerimaNama: "Jumadi",
        penerimaJabatan: "Driver",
        mengetahuiNama: "Zoni Rahmawan Putra",
        mengetahuiJabatan: "Kepala Bagian Pengadaan dan Logistik",
        createdAt: new Date("2026-04-28T06:32:10.457Z"),
        updatedAt: new Date("2026-04-28T06:32:10.457Z"),
      },
    ]);

    await queryInterface.bulkInsert("TransaksiItems", [
      {
        id: "1777356790234",
        transaksiId: transaksiId,
        nama: "PC Dell Pro Slim QCS1250",
        keterangan: "SN Monitor J0V1Q14",
        kuantitas: 1,
        satuan: "Unit",
        sn: "3N63PD4",
        outlet: "CP SUDIRMAN",
        createdAt: new Date("2026-04-28T06:32:10.457Z"),
        updatedAt: new Date("2026-04-28T06:32:10.457Z"),
      },
      {
        id: "1777356799634",
        transaksiId: transaksiId,
        nama: "Printer LQ 310 Apr 2026",
        keterangan: "Kasir",
        kuantitas: 1,
        satuan: "Unit",
        sn: "R9JYJ67179",
        outlet: "CP SUDIRMAN",
        createdAt: new Date("2026-04-28T06:32:10.457Z"),
        updatedAt: new Date("2026-04-28T06:32:10.457Z"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TransaksiItems", { transaksiId: "TRX-000001" }, {});
    await queryInterface.bulkDelete("Transaksis", { id: "TRX-000001" }, {});
  },
};