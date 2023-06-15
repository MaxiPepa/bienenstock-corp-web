import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import styles from "./Styles";

const Invoice = ({ data }) => {
  const divDate = data.date.split("T")[0].split("-");
  const showDate = divDate[2] + "/" + divDate[1] + "/" + divDate[0];
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.invoiceContainer}>
          <View style={[styles.dataContainer, styles.sector1]}>
            <Text>ORIGINAL</Text>
          </View>
          <View style={[styles.dataContainer, { height: "14%" }]}>
            <View style={styles.dataInvoice}>
              <View style={styles.dataCompany}>
                <Image
                  src={process.env.PUBLIC_URL + "/LogoInvoice.png"}
                  style={styles.image}
                />
                <Text> </Text>
                <Text style={styles.text}>
                  {data.bill.companyAddress}
                </Text>
              </View>
              <View style={styles.dataCompanyInvoice}>
                <Text style={styles.title}>FACTURA</Text>
                <Text style={styles.text}>N°: {data.bill.billId}</Text>
                <Text style={styles.text}>FECHA: {showDate}</Text>
                <Text> </Text>
                <Text style={styles.text}>CUIT: {data.bill.companyIdentifier}</Text>
                <Text style={styles.text}>INICIO ACTIVIDADES: {data.bill.companyStart} </Text>
              </View>
            </View>
            <View style={styles.typeInvoice}>
              <Text>{data.bill.billType}</Text>
            </View>
          </View>
          <View style={[styles.dataContainer, styles.dataClient]}>
            <Text style={styles.text}>
              Nombre y Apellido: {data.bill.businessName}
            </Text>
            <Text style={styles.text}>DNI: {data.bill.consumerIdentifier}</Text>
            <Text style={styles.text}>
              Domicilio: {data.bill.consumerAddress}
            </Text>
            <Text style={styles.text}>
              Pago: {data.bill.paymentType}
            </Text>
          </View>
          <View style={[styles.dataContainer, { height: "73%" }]}>
            <View
              style={[
                styles.tableContainer,
                { fontSize: 12, backgroundColor: "black", color: "white" },
              ]}
            >
              <Text style={styles.code}>CODIGO</Text>
              <Text style={styles.description}>DESCRIPCION</Text>
              <Text style={styles.quantity}>CANT.</Text>
              <Text style={styles.unitPrice}>PRECIO UNIT.</Text>
              <Text style={styles.subtotal}>SUBTOTAL</Text>
            </View>
            {data.products.map((item, index) => (
              <View
                style={[styles.tableContainer, { fontSize: 10 }]}
                key={index}
              >
                <Text style={styles.code}>{item.productCode}</Text>
                <Text style={styles.description}>{item.name}</Text>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <Text style={styles.unitPrice}>
                  ${item.unitPrice.toFixed(2)}
                </Text>
                <Text style={styles.subtotal}>
                  ${(item.quantity * item.unitPrice).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
          <View style={[styles.dataContainer, styles.total]}>
            <Text>TOTAL</Text>
            <Text>${data.totalPrice.toFixed(2)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
