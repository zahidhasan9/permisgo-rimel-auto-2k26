"use client";

import { useState } from "react";
import { createOffer, deleteOffer, updateOffer } from "@/features/API";
import useOffers, { formatOfferPrice } from "@/hooks/useOffers";
import { showToast } from "@/utils/showToast";

const emptyForm = {
  title: "", category: "code", transmission: "both", description: "",
  regularPrice: "", salePrice: "", features: "", hourOptions: "",
  isFeatured: false, status: "active",
};

export default function AdminOffersPage() {
  const { offers, loading, error, reload } = useOffers({ includeInactive: true });
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const setValue = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const edit = (offer) => {
    setEditingId(offer._id);
    setForm({
      ...emptyForm, ...offer,
      features: (offer.features || []).join("\n"),
      hourOptions: (offer.hourOptions || []).map((item) => item.label).join(", "),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      regularPrice: Number(form.regularPrice),
      salePrice: Number(form.salePrice),
      features: form.features.split("\n").map((item) => item.trim()).filter(Boolean),
      hourOptions: form.hourOptions.split(",").map((label) => label.trim()).filter(Boolean).map((label, index) => ({ label, value: Number.parseFloat(label) || index + 1 })),
    };
    try {
      editingId ? await updateOffer(editingId, payload) : await createOffer(payload);
      showToast.success(editingId ? "Offer updated" : "Offer created");
      setForm(emptyForm); setEditingId(null); await reload();
    } catch (err) {
      showToast.error(err.response?.data?.message || "Unable to save offer");
    } finally { setSaving(false); }
  };

  const remove = async (offer) => {
    if (!window.confirm(`Delete “${offer.title}”?`)) return;
    try { await deleteOffer(offer._id); showToast.success("Offer deleted"); await reload(); }
    catch (err) { showToast.error(err.response?.data?.message || "Unable to delete offer"); }
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-[#174A9B]">Offers</h1><p className="mt-1 text-sm text-gray-500">Manage offers shown across the website and dashboards.</p></div>
      <form onSubmit={submit} className="rounded-xl bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <input required name="title" value={form.title} onChange={setValue} placeholder="Offer title" className="rounded-lg border px-3 py-2.5" />
          <select name="category" value={form.category} onChange={setValue} className="rounded-lg border px-3 py-2.5"><option value="code">Code</option><option value="to drive">To Drive</option><option value="cpf">CPF</option><option value="accompanied">Accompanied</option><option value="other">À la carte</option></select>
          <select name="transmission" value={form.transmission} onChange={setValue} className="rounded-lg border px-3 py-2.5"><option value="both">Both transmissions</option><option value="manual">Manual transmission</option><option value="automatic">Automatic transmission</option></select>
          <input required min="0" type="number" name="regularPrice" value={form.regularPrice} onChange={setValue} placeholder="Retail price" className="rounded-lg border px-3 py-2.5" />
          <input required min="0" type="number" name="salePrice" value={form.salePrice} onChange={setValue} placeholder="Sale price" className="rounded-lg border px-3 py-2.5" />
          <select name="status" value={form.status} onChange={setValue} className="rounded-lg border px-3 py-2.5"><option value="active">Active</option><option value="inactive">Inactive</option></select>
          <input name="hourOptions" value={form.hourOptions} onChange={setValue} placeholder="Hours: 1 hr, 5 hr, 10 hr" className="rounded-lg border px-3 py-2.5 md:col-span-2" />
          <label className="flex items-center gap-2 rounded-lg border px-3 py-2.5"><input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={setValue} /> Featured offer</label>
          <textarea name="description" value={form.description} onChange={setValue} placeholder="Description" rows="3" className="rounded-lg border px-3 py-2.5 md:col-span-2" />
          <textarea name="features" value={form.features} onChange={setValue} placeholder="Package features (one per line)" rows="3" className="rounded-lg border px-3 py-2.5" />
        </div>
        <div className="mt-4 flex gap-3"><button disabled={saving} className="rounded-lg bg-[#174A9B] px-5 py-2.5 font-semibold text-white disabled:opacity-60">{saving ? "Saving..." : editingId ? "Update Offer" : "Create Offer"}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="rounded-lg border px-5 py-2.5">Cancel</button>}</div>
      </form>
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm"><table className="w-full min-w-[800px] text-left text-sm"><thead className="bg-[#E8EEF8] text-[#174A9B]"><tr>{["Title", "Category", "Transmission", "Price", "Status", "Actions"].map((item) => <th key={item} className="px-4 py-3">{item}</th>)}</tr></thead><tbody>{offers.map((offer) => <tr key={offer._id} className="border-t"><td className="px-4 py-3 font-semibold">{offer.title}</td><td className="px-4 py-3 capitalize">{offer.category}</td><td className="px-4 py-3 capitalize">{offer.transmission || "both"}</td><td className="px-4 py-3">{formatOfferPrice(offer.salePrice)} <span className="text-gray-400 line-through">{formatOfferPrice(offer.regularPrice)}</span></td><td className="px-4 py-3 capitalize">{offer.status}</td><td className="px-4 py-3"><button onClick={() => edit(offer)} className="mr-3 font-semibold text-[#174A9B]">Edit</button><button onClick={() => remove(offer)} className="font-semibold text-[#E5273D]">Delete</button></td></tr>)}</tbody></table>{loading && <p className="p-5 text-gray-500">Loading offers...</p>}{error && <p className="p-5 text-red-600">{error}</p>}{!loading && !error && offers.length === 0 && <p className="p-5 text-gray-500">No offers created yet.</p>}</div>
    </div>
  );
}
