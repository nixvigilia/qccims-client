import React from "react";
import {Page, Text, View, Document, StyleSheet} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

// Create Document Component
const PurchaseOrderPdf = ({data}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Purchase Order</Text>
        <Text>PO{data.id}</Text>
        <Text>Order Date: {data.orderDate}</Text>
        <Text>Term: {data.term}</Text>
        <Text>Requestor: {data.requestor}</Text>
        <Text>VAT: {data.vat}</Text>
        <Text>Supplier: {data.supplier?.supplierName}</Text>
        <Text>Total Amount: {data.totalAmount}</Text>
        <Text>Remarks: {data.remarks}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Product Description</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Quantity</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Unit Price</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Amount</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Remarks</Text>
          </View>
        </View>
        {data.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.description}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {item.quantity} {item.unit}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>₱ {item.unitPrice}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>₱ {item.amount}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.remarks}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PurchaseOrderPdf;
