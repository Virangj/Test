"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText } from "lucide-react"
import toast from "react-hot-toast"

type InvoiceData = {
  invoice: string
  paymentStatus: string
  totalAmount: string
  paymentMethod: string
  file?: File
  fileName?: string
}

export default function InvoiceForm() {
  const [formData, setFormData] = useState<InvoiceData>({
    invoice: "",
    paymentStatus: "Unpaid",
    totalAmount: "",
    paymentMethod: "Credit Card",
  })

  const [tableData, setTableData] = useState<InvoiceData[]>([])

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file,
        fileName: file.name,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.invoice || !formData.totalAmount) {
      toast.error("Please fill in required fields")
      return
    }

    setTableData((prev) => [...prev, formData])
    setFormData({
      invoice: "",
      paymentStatus: "Unpaid",
      totalAmount: "",
      paymentMethod: "Credit Card",
      file: undefined,
      fileName: undefined,
    })
    toast.success("Entry has been Noted!")
  }

  const getStatusBadge = (status: string) => {
    const variant = status === "Paid" ? "default" : status === "Pending" ? "secondary" : "destructive"
    return <Badge variant={variant}>{status}</Badge>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Invoice Form</CardTitle>
          <CardDescription>
            Fill in the invoice details and submit to add to the table below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="invoice">Invoice Number *</Label>
                <Input
                  id="invoice"
                  type="text"
                  value={formData.invoice}
                  onChange={(e) => handleChange("invoice", e.target.value)}
                  placeholder="INV007"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentStatus">Payment Status</Label>
                <Select
                  value={formData.paymentStatus}
                  onValueChange={(value) => handleChange("paymentStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Unpaid">Unpaid</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalAmount">Total Amount *</Label>
                <Input
                  id="totalAmount"
                  type="text"
                  value={formData.totalAmount}
                  onChange={(e) => handleChange("totalAmount", e.target.value)}
                  placeholder="$300.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleChange("paymentMethod", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Upload File</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="flex-1"
                />
                <Upload className="h-5 w-5 text-gray-500" />
              </div>
              {formData.fileName && (
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                  <FileText className="h-4 w-4" />
                  <span>Uploaded: {formData.fileName}</span>
                </div>
              )}
            </div>

            <Button onClick={handleSubmit} className="w-full md:w-auto">
              Submit Invoice
            </Button>
          </div>
        </CardContent>
      </Card>

      {tableData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Submitted Invoices</CardTitle>
            <CardDescription>
              A list of all submitted invoices with their details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Invoice</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Amount</th>
                    <th className="text-left p-3 font-medium">Method</th>
                    <th className="text-left p-3 font-medium">File</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((entry, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{entry.invoice}</td>
                      <td className="p-3">{getStatusBadge(entry.paymentStatus)}</td>
                      <td className="p-3">{entry.totalAmount}</td>
                      <td className="p-3">{entry.paymentMethod}</td>
                      <td className="p-3">
                        {entry.fileName ? (
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{entry.fileName}</span>
                          </div>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
