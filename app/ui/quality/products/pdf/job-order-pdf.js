import React from "react";
import {Page, Text, View, Document, StyleSheet} from "@react-pdf/renderer";
import dayjs from "dayjs";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 8, // Smaller font size for headers
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  title: {
    fontSize: 8, // Smaller font size for titles
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  table: {
    display: "table",
    width: "100%",
    marginBottom: 10,
    borderStyle: "solid",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  tableColProductDescription: {
    width: "40%", // Wider column for Product Description
  },
  tableColStandard: {
    width: "12%", // Narrower columns for other fields
  },
  tableCell: {
    margin: 5,
    fontSize: 8, // Smaller font size for table cells
    textAlign: "center", // Center-align text in table cells
  },
});

// Create Document Component
const JobOrderPdf = ({data}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>QUALITY CONTAINER CORPORATION</Text>
        <Text style={styles.header}>PRODUCTION JOB ORDER</Text>
        <View style={styles.row}>
          <Text style={styles.title}>JO #: {data.jobNumber}</Text>
          <Text style={styles.title}>
            Date: {dayjs(data.jobDate).format("YYYY-MM-DD")}
          </Text>
        </View>
        <Text style={styles.title}>Customer: {data.customer?.companyName}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.tableColProductDescription]}>
            <Text style={styles.tableCell}>Product Description</Text>
          </View>
          <View style={[styles.tableCol, styles.tableColStandard]}>
            <Text style={styles.tableCell}>Batch #</Text>
          </View>
          <View style={[styles.tableCol, styles.tableColStandard]}>
            <Text style={styles.tableCell}>SO/PO</Text>
          </View>
          <View style={[styles.tableCol, styles.tableColStandard]}>
            <Text style={styles.tableCell}>Delivery Date</Text>
          </View>
          <View style={[styles.tableCol, styles.tableColStandard]}>
            <Text style={styles.tableCell}>Quantity</Text>
          </View>
          <View style={[styles.tableCol, styles.tableColStandard]}>
            <Text style={styles.tableCell}>Unit</Text>
          </View>
          <View style={[styles.tableCol, styles.tableColStandard]}>
            <Text style={styles.tableCell}>Remarks</Text>
          </View>
        </View>
        {data.jobOrderItems.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={[styles.tableCol, styles.tableColProductDescription]}>
              <Text style={styles.tableCell}>
                {item.product?.productName || "N/A"}
              </Text>
            </View>
            <View style={[styles.tableCol, styles.tableColStandard]}>
              <Text style={styles.tableCell}>{item.id}</Text>
            </View>
            <View style={[styles.tableCol, styles.tableColStandard]}>
              <Text style={styles.tableCell}>{item.salesOrder || "N/A"}</Text>
            </View>
            <View style={[styles.tableCol, styles.tableColStandard]}>
              <Text style={styles.tableCell}>
                {item.deliveryDate
                  ? dayjs(item.deliveryDate).format("YYYY-MM-DD")
                  : "N/A"}
              </Text>
            </View>
            <View style={[styles.tableCol, styles.tableColStandard]}>
              <Text style={styles.tableCell}>{item.quantity || "N/A"}</Text>
            </View>
            <View style={[styles.tableCol, styles.tableColStandard]}>
              <Text style={styles.tableCell}>
                {item.unit?.abbreviation || "N/A"}
              </Text>
            </View>
            <View style={[styles.tableCol, styles.tableColStandard]}>
              <Text style={styles.tableCell}>{item.remarks || "N/A"}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default JobOrderPdf;
