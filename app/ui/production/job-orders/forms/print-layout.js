"use client";

import {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import formatISODateToReadable from "@/utils/helpers/formatISODateToReadable";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button"; // Import the Button component

export default function PrintLayout({
  initialData = {},
  itemId,
  isUpdate = false,
  mutate,
}) {
  // Print function to trigger the print dialog
  const handlePrint = () => {
    const printContents = document.getElementById("print-section").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload the page to restore the original state
  };

  return (
    <Box mt={4}>
      {/* Print button */}
      <Box sx={{display: "flex", justifyContent: "flex-end", mb: 2}}>
        <Button variant="contained" onClick={handlePrint}>
          Print
        </Button>
      </Box>

      {/* Print section */}
      <Box id="print-section">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box width="100%" sx={{textAlign: "center"}}>
              <Typography variant="button">
                QUALITY CONTAINER CORPORATION
              </Typography>
            </Box>
            <Box width="100%" sx={{textAlign: "center"}}>
              <Typography variant="button">PRODUCTION JOB ORDER</Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box>
              <Typography variant="button">JO #:</Typography>
            </Box>
            <Box>
              <Typography variant="button">CUSTOMER:</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Typography variant="button">Date:</Typography>
            </Box>
          </Grid>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>PRODUCT DESCRIPTION</TableCell>
                  <TableCell>SO/PO</TableCell>
                  <TableCell>DELIVERY DATE</TableCell>
                  <TableCell>QUANTITY</TableCell>
                  <TableCell>UNIT</TableCell>
                  <TableCell>REMARKS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {[...Array(2)].map((_, i) => (
            <Grid item xs={6} key={i}>
              <Grid container>
                {[...Array(3)].map((_, index) => {
                  return (
                    <Grid
                      item
                      xs={4}
                      key={index}
                      sx={{
                        "& .MuiTableCell-root": {border: "1px solid black"},
                      }}
                    >
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Date</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>OPTR#</TableCell>
                              <TableCell>QTY</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody sx={{height: "100px"}}>
                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <TableContainer sx={{padding: 0, margin: 0}}>
              <Table size="small" sx={{padding: 0, margin: 0}}>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{width: "25%", padding: "4px"}}>
                      <Typography variant="button">ID #:</Typography>
                    </TableCell>
                    <TableCell sx={{width: "75%", padding: "4px"}}>
                      <Typography variant="button">CUSTOMER:</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{width: "25%", padding: "4px"}}>
                      <Typography variant="button">TAG #:</Typography>
                    </TableCell>
                    <TableCell sx={{width: "75%", padding: "4px"}}>
                      <Typography variant="button">PRODUCT:</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{width: "25%", padding: "4px"}}></TableCell>
                    <TableCell sx={{width: "75%", padding: "4px"}}>
                      <Typography variant="button">CAN SIZE:</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <TableContainer sx={{padding: 0, margin: 0}}>
                  <Table size="small" sx={{padding: 0, margin: 0}}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            border: "1px solid black",
                            padding: "4px",
                            width: "8%",
                          }}
                        ></TableCell>
                        <TableCell
                          colSpan={3}
                          sx={{
                            border: "1px solid black",
                            textAlign: "center",
                            padding: "4px",
                          }}
                        >
                          STANDARD MATERIALS
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px solid black",
                            padding: "4px",
                            width: "12%",
                          }}
                        >
                          BASE WT.
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          BODY
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SAMPLE DATA
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SAMPLE DATA
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SAMPLE DATA
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          100# +/- 5%
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          BOTTOM
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SAMPLE DATA
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SAMPLE DATA
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SAMPLE DATA
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          100# +/- 5%
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          COVER
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SAMPLE DATA
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SAMPLE DATA
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SAMPLE DATA
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          100# +/- 5%
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          TOPRING
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SAMPLE DATA
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SAMPLE DATA
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SAMPLE DATA
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          100# +/- 5%
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                sx={{
                  "& .MuiTableCell-root": {
                    border: "1px solid black",
                    padding: "4px",
                  },
                }}
              >
                <TableContainer component={Paper} sx={{padding: 0, margin: 0}}>
                  <Table size="small" sx={{padding: 0, margin: 0}}>
                    <TableBody>
                      <TableRow>
                        <TableCell width="200px" sx={{padding: "4px"}}>
                          BODY BLANK LENGTH
                        </TableCell>
                        <TableCell sx={{padding: "4px"}}>SAMPLE DATA</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{padding: "4px"}}>
                          BODY BLANK WIDTH
                        </TableCell>
                        <TableCell sx={{padding: "4px"}}>SAMPLE DATA</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{padding: "4px"}}>
                          ACTUAL CAN HEIGHT
                        </TableCell>
                        <TableCell sx={{padding: "4px"}}>SAMPLE DATA</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{padding: "4px"}}>
                          COVER / SPOUT
                        </TableCell>
                        <TableCell sx={{padding: "4px"}}>SAMPLE DATA</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{padding: "4px"}}>
                          JOINT INTERLOCKING
                        </TableCell>
                        <TableCell sx={{padding: "4px"}}>SAMPLE DATA</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{padding: "4px"}}>HANDLE</TableCell>
                        <TableCell sx={{padding: "4px"}}>SAMPLE DATA</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{padding: "4px"}}>
                          HANDLE LOCATION
                        </TableCell>
                        <TableCell sx={{padding: "4px"}}>SAMPLE DATA</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                sx={{
                  "& .MuiTableCell-root": {
                    border: "1px solid black",
                    padding: "4px",
                  },
                }}
              >
                <TableContainer component={Paper} sx={{padding: 0, margin: 0}}>
                  <Table size="small" sx={{padding: 0, margin: 0}}>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          width="200px"
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          HANDLE DISTANCE
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SAMPLE DATA
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SOLDER
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SAMPLE DATA
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          BEADS
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SAMPLE DATA
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          NUMBER OF BEADS
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SAMPLE DATA
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          EMBOSS
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SAMPLE DATA
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          EMBOSS LOCATION
                        </TableCell>
                        <TableCell
                          sx={{border: "1px solid black", padding: "4px"}}
                        >
                          SAMPLE DATA
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          sx={{
                            border: "1px solid black",
                            padding: "4px",
                            fontSize: "10px",
                          }}
                        >
                          REMARKS: Lorem Ipsum is simply dummy text of the
                          printing and typesetting industry. Lorem Ipsum has
                          been the industry's standard dummy text ever since the
                          1500s, when an unknown printer took a galley of type
                          and scrambled it to make a type specimen book.
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
