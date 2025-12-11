// Auto-generated data.js from processor.py
// Contains processed NCCN decision trees with search terms

const TREES = {
  "AML_12": {
    "root": {
      "id": "node_root",
      "label": "Consolidation Therapy",
      "type": "condition",
      "search_term": "Consolidation Therapy",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Intensive Induction Eligible",
          "type": "condition",
          "search_term": null,
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Favorable-risk AML by cytogenetics or by molecular mutation profile per ELN",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Treatment",
                  "type": "treatment",
                  "search_term": "Treatment",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_0_child_0",
                      "label": "Cytarabine gemtuzumab ozogamicin (CD33 positive) (only if gemtuzumab ozogamicin was given during induction)",
                      "type": "condition",
                      "search_term": "Cytarabine gemtuzumab gemtuzumab",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_1",
                      "label": "Cytarabine (5 or 7 days) [(daunorubicin or idarubicin) or (mitoxantrone for age ≥60 y)]",
                      "type": "condition",
                      "search_term": "Cytarabine",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_2",
                      "label": "Cytarabine + (daunorubicin or idarubicin) + gemtuzumab ozogamicin,, (CD33 positive) (only if gemtuzumab ozogamicin was given during induction)",
                      "type": "condition",
                      "search_term": "Cytarabine gemtuzumab gemtuzumab",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_0_child_1",
                  "label": "Next",
                  "type": "condition",
                  "search_term": "Next",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_1_child_0",
                      "label": "Consider allogeneic HCT",
                      "type": "condition",
                      "search_term": "Consider HCT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_1_child_1",
                      "label": "Maintenance",
                      "type": "condition",
                      "search_term": "Maintenance",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_1_child_2",
                      "label": "Surveillance",
                      "type": "condition",
                      "search_term": "Surveillance",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "AML with FLT3 mutation",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "Treatment",
                  "type": "treatment",
                  "search_term": "Treatment",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_0_child_0",
                      "label": "Allogeneic HCT (preferred for FLT3-ITD)",
                      "type": "condition",
                      "search_term": "Allogeneic HCT FLT3-ITD)",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_1_child_0_child_1",
                      "label": "Cytarabine + midostaurin (FLT3-ITD or TKD)",
                      "type": "condition",
                      "search_term": "Cytarabine midostaurin TKD)",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_1_child_0_child_2",
                      "label": "Cytarabine + quizartinib (FLT3-ITD only)",
                      "type": "condition",
                      "search_term": "Cytarabine quizartinib",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_1_child_1",
                  "label": "Next",
                  "type": "condition",
                  "search_term": "Next",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_1_child_0",
                      "label": "Allogeneic HCT (if not previously performed)",
                      "type": "condition",
                      "search_term": "Allogeneic HCT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_1_child_1_child_1",
                      "label": "Maintenance",
                      "type": "condition",
                      "search_term": "Maintenance",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_1_child_1_child_2",
                      "label": "Surveillance",
                      "type": "condition",
                      "search_term": "Surveillance",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_0_child_2",
              "label": "Intermediate-risk AML",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_0_child_2_child_0",
                  "label": "Treatment",
                  "type": "treatment",
                  "search_term": "Treatment",
                  "children": [
                    {
                      "id": "node_root_child_0_child_2_child_0_child_0",
                      "label": "Cytarabine",
                      "type": "condition",
                      "search_term": "Cytarabine",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_2_child_0_child_1",
                      "label": "Cytarabine + (daunorubicin or idarubicin) + gemtuzumab ozogamicin,, (CD33 positive) (only if gemtuzumab ozogamicin was given during induction)",
                      "type": "condition",
                      "search_term": "Cytarabine gemtuzumab gemtuzumab",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_2_child_0_child_2",
                      "label": "Allogeneic HCT",
                      "type": "condition",
                      "search_term": "Allogeneic HCT",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_2_child_1",
                  "label": "Next",
                  "type": "condition",
                  "search_term": "Next",
                  "children": [
                    {
                      "id": "node_root_child_0_child_2_child_1_child_0",
                      "label": "Allogeneic HCT (if not previously performed)",
                      "type": "condition",
                      "search_term": "Allogeneic HCT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_2_child_1_child_1",
                      "label": "Maintenance",
                      "type": "condition",
                      "search_term": "Maintenance",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_2_child_1_child_2",
                      "label": "Surveillance",
                      "type": "condition",
                      "search_term": "Surveillance",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_0_child_3",
              "label": "Poor-risk AML",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_0_child_3_child_0",
                  "label": "Criteria",
                  "type": "condition",
                  "search_term": null,
                  "children": [
                    {
                      "id": "node_root_child_0_child_3_child_0_child_0",
                      "label": "With and without TP53 mutation or del(17p) abnormality",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_3_child_0_child_1",
                      "label": "Therapy-related AML other than CBF-AML",
                      "type": "condition",
                      "search_term": "Therapy-related CBF-AML",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_3_child_0_child_2",
                      "label": "Antecedent MDS/CMML",
                      "type": "condition",
                      "search_term": "Antecedent MDS/CMML",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_3_child_0_child_3",
                      "label": "Cytogenetic changes consistent with MDS (previously classified as AML-MRC)",
                      "type": "condition",
                      "search_term": "Cytogenetic MDS AML-MRC)",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_3_child_1",
                  "label": "Treatment",
                  "type": "treatment",
                  "search_term": "Treatment",
                  "children": [
                    {
                      "id": "node_root_child_0_child_3_child_1_child_0",
                      "label": "Allogeneic HCT, (preferred)",
                      "type": "condition",
                      "search_term": "Allogeneic HCT,",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_3_child_1_child_1",
                      "label": "Cytarabine",
                      "type": "condition",
                      "search_term": "Cytarabine",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_3_child_1_child_2",
                      "label": "CPX-351/dual-drug liposomal encapsulation of cytarabine and daunorubicin (preferred only if given during induction)",
                      "type": "condition",
                      "search_term": "CPX-351/dual-drug cytarabine daunorubicin",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_3_child_1_child_3",
                      "label": "FLAG-IDA (use with caution in patients >60 y) (preferred only if given during induction)",
                      "type": "condition",
                      "search_term": "FLAG-IDA",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_3_child_1_child_4",
                      "label": "Continuation of lower intensity regimen used for induction (e.g., HMA, azacitidine or decitabine) + venetoclax)",
                      "type": "condition",
                      "search_term": "Continuation HMA, azacitidine",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_3_child_2",
                  "label": "Next",
                  "type": "condition",
                  "search_term": "Next",
                  "children": [
                    {
                      "id": "node_root_child_0_child_3_child_2_child_0",
                      "label": "Allogeneic HCT (if not previously performed)",
                      "type": "condition",
                      "search_term": "Allogeneic HCT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_3_child_2_child_1",
                      "label": "Maintenance",
                      "type": "condition",
                      "search_term": "Maintenance",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_3_child_2_child_2",
                      "label": "Surveillance",
                      "type": "condition",
                      "search_term": "Surveillance",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "AML_14": {
    "root": {
      "id": "node_root",
      "label": "Evaluation and Treatment of CNS Leukemia",
      "type": "treatment",
      "search_term": "Evaluation Treatment CNS Leukemia",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "At diagnosis, neurologic symptoms",
          "type": "condition",
          "search_term": null,
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "CT/MRI to rule out bleed or mass effect",
              "type": "condition",
              "search_term": "CT/MRI",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Negative mass effect",
                  "type": "condition",
                  "search_term": "Negative",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_0_child_0",
                      "label": "LP",
                      "type": "condition",
                      "search_term": "LP",
                      "children": [
                        {
                          "id": "node_root_child_0_child_0_child_0_child_0_child_0",
                          "label": "Negative",
                          "type": "condition",
                          "search_term": "Negative",
                          "children": [
                            {
                              "id": "node_root_child_0_child_0_child_0_child_0_child_0_child_0",
                              "label": "Observe and repeat LP if symptoms persist",
                              "type": "condition",
                              "search_term": "Observe LP",
                              "children": []
                            }
                          ]
                        },
                        {
                          "id": "node_root_child_0_child_0_child_0_child_0_child_1",
                          "label": "Positive by morphology or immunotype by flow cytometry",
                          "type": "condition",
                          "search_term": "Positive",
                          "children": [
                            {
                              "id": "node_root_child_0_child_0_child_0_child_0_child_1_child_0",
                              "label": "IT chemotherapy 2x/wk until clear, then weekly x 4–6 wks",
                              "type": "condition",
                              "search_term": "IT chemotherapy",
                              "children": []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_0_child_1",
                  "label": "Positive mass effect or increased intracranial pressure",
                  "type": "condition",
                  "search_term": "Positive",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_1_child_0",
                      "label": "Consider fine-needle aspiration (FNA) or biopsy",
                      "type": "condition",
                      "search_term": "Consider",
                      "children": [
                        {
                          "id": "node_root_child_0_child_0_child_1_child_0_child_0",
                          "label": "Treatment Options",
                          "type": "treatment",
                          "search_term": "Treatment Options",
                          "children": [
                            {
                              "id": "node_root_child_0_child_0_child_1_child_0_child_0_child_0",
                              "label": "RT followed by IT chemotherapy 2x/wk until clear, then weekly x 4–6 wks",
                              "type": "condition",
                              "search_term": "RT IT chemotherapy",
                              "children": []
                            },
                            {
                              "id": "node_root_child_0_child_0_child_1_child_0_child_0_child_1",
                              "label": "Cytarabine-based therapy with doses ≥2 g/m + dexamethasone to reduce intracranial pressure",
                              "type": "condition",
                              "search_term": "Cytarabine-based",
                              "children": []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "First CR screening, no neurologic symptoms",
          "type": "condition",
          "search_term": "First CR",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "LP",
              "type": "condition",
              "search_term": "LP",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Negative",
                  "type": "condition",
                  "search_term": "Negative",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_0_child_0",
                      "label": "Observe and repeat LP if symptoms present",
                      "type": "condition",
                      "search_term": "Observe LP",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "Cerebrospinal fluid (CSF) positive by morphology or immunotype by flow cytometry",
                  "type": "condition",
                  "search_term": "Cerebrospinal",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_1_child_0",
                      "label": "IT chemotherapy 2x/wk until clear",
                      "type": "condition",
                      "search_term": "IT chemotherapy",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_0_child_1_child_1",
                      "label": "If patient to receive cytarabine ≥2 g/m, follow up with LP post therapy to document clearance",
                      "type": "condition",
                      "search_term": "cytarabine LP",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "AML_15": {
    "root": {
      "id": "node_root",
      "label": "Principles of Venetoclax Use with HMA or LDAC",
      "type": "condition",
      "search_term": "Principles Venetoclax HMA LDAC",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Cycle 1",
          "type": "condition",
          "search_term": "Cycle",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Venetoclax + HMA or LDAC",
              "type": "condition",
              "search_term": "Venetoclax HMA LDAC",
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Day 21–28",
          "type": "condition",
          "search_term": "Day",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "BM aspirate and biopsy",
              "type": "condition",
              "search_term": "BM",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "CR (Response criteria, see AML-I)",
                  "type": "condition",
                  "search_term": null,
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_0_child_0",
                      "label": "Action",
                      "type": "condition",
                      "search_term": "Action",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_0_child_0_child_0",
                          "label": "Start cycle 2 on day 29 or later if marrow results not available on day 29",
                          "type": "condition",
                          "search_term": "Start",
                          "children": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "MLFS or CRi (Response criteria, see AML-I)",
                  "type": "condition",
                  "search_term": null,
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_1_child_0",
                      "label": "Delay cycle 2",
                      "type": "condition",
                      "search_term": "Delay",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_1_child_0_child_0",
                          "label": "Duration",
                          "type": "condition",
                          "search_term": "Duration",
                          "children": [
                            {
                              "id": "node_root_child_1_child_0_child_1_child_0_child_0_child_0",
                              "label": "up to 14 days",
                              "type": "condition",
                              "search_term": null,
                              "children": []
                            }
                          ]
                        },
                        {
                          "id": "node_root_child_1_child_0_child_1_child_0_child_1",
                          "label": "Purpose",
                          "type": "condition",
                          "search_term": "Purpose",
                          "children": [
                            {
                              "id": "node_root_child_1_child_0_child_1_child_0_child_1_child_0",
                              "label": "allow recovery of ANC >0.5 x 10/L and platelets >50 x 10/L",
                              "type": "condition",
                              "search_term": "ANC",
                              "children": []
                            }
                          ]
                        },
                        {
                          "id": "node_root_child_1_child_0_child_1_child_0_child_2",
                          "label": "Note",
                          "type": "condition",
                          "search_term": "Note",
                          "children": [
                            {
                              "id": "node_root_child_1_child_0_child_1_child_0_child_2_child_0",
                              "label": "G-CSF may be added",
                              "type": "condition",
                              "search_term": "G-CSF",
                              "children": []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_0_child_1_child_1",
                      "label": "Then",
                      "type": "condition",
                      "search_term": "Then",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_1_child_1_child_0",
                          "label": "Action",
                          "type": "condition",
                          "search_term": "Action",
                          "children": [
                            {
                              "id": "node_root_child_1_child_0_child_1_child_1_child_0_child_0",
                              "label": "Start cycle 2",
                              "type": "condition",
                              "search_term": "Start",
                              "children": []
                            }
                          ]
                        },
                        {
                          "id": "node_root_child_1_child_0_child_1_child_1_child_1",
                          "label": "Considerations",
                          "type": "condition",
                          "search_term": "Considerations",
                          "children": [
                            {
                              "id": "node_root_child_1_child_0_child_1_child_1_child_1_child_0",
                              "label": "Reduction of venetoclax duration to 21 days",
                              "type": "condition",
                              "search_term": "Reduction venetoclax",
                              "children": []
                            }
                          ]
                        },
                        {
                          "id": "node_root_child_1_child_0_child_1_child_1_child_2",
                          "label": "Next",
                          "type": "condition",
                          "search_term": "Next",
                          "children": [
                            {
                              "id": "node_root_child_1_child_0_child_1_child_1_child_2_child_0",
                              "label": "Cycle 3 and beyond",
                              "type": "condition",
                              "search_term": "Cycle",
                              "children": [
                                {
                                  "id": "node_root_child_1_child_0_child_1_child_1_child_2_child_0_child_0",
                                  "label": "Consider further reduction in venetoclax duration (14 days, 7 days, or 5 days) if cytopenias recur",
                                  "type": "condition",
                                  "search_term": "Consider venetoclax",
                                  "children": []
                                },
                                {
                                  "id": "node_root_child_1_child_0_child_1_child_1_child_2_child_0_child_1",
                                  "label": "Dose modifications to HMA or LDAC may be considered per label",
                                  "type": "condition",
                                  "search_term": "Dose HMA LDAC",
                                  "children": []
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_0_child_2",
                  "label": "Lack of response (Response criteria, see AML-I)",
                  "type": "condition",
                  "search_term": null,
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_2_child_0",
                      "label": "Action",
                      "type": "condition",
                      "search_term": "Action",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_2_child_0_child_0",
                          "label": "Start cycle 2 without delay",
                          "type": "condition",
                          "search_term": "Start",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_0_child_2_child_1",
                      "label": "Then",
                      "type": "condition",
                      "search_term": "Then",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_2_child_1_child_0",
                          "label": "BM aspirate and biopsy (days 21–28)",
                          "type": "condition",
                          "search_term": "BM",
                          "children": [
                            {
                              "id": "node_root_child_1_child_0_child_2_child_1_child_0_child_0",
                              "label": "MLFS or better response (Response criteria, see AML-I)",
                              "type": "condition",
                              "search_term": null,
                              "children": []
                            },
                            {
                              "id": "node_root_child_1_child_0_child_2_child_1_child_0_child_1",
                              "label": "Lack of response (Response criteria, see AML-I)",
                              "type": "condition",
                              "search_term": null,
                              "children": [
                                {
                                  "id": "node_root_child_1_child_0_child_2_child_1_child_0_child_1_child_0",
                                  "label": "Action",
                                  "type": "condition",
                                  "search_term": "Action",
                                  "children": [
                                    {
                                      "id": "node_root_child_1_child_0_child_2_child_1_child_0_child_1_child_0_child_0",
                                      "label": "Continue therapy up to 4 cycles",
                                      "type": "condition",
                                      "search_term": "Continue",
                                      "children": []
                                    }
                                  ]
                                },
                                {
                                  "id": "node_root_child_1_child_0_child_2_child_1_child_0_child_1_child_1",
                                  "label": "If no response",
                                  "type": "condition",
                                  "search_term": null,
                                  "children": [
                                    {
                                      "id": "node_root_child_1_child_0_child_2_child_1_child_0_child_1_child_1_child_0",
                                      "label": "See Therapy for Relapsed/Refractory Disease",
                                      "type": "condition",
                                      "search_term": "See Therapy Relapsed/Refractory Disease",
                                      "children": []
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "id": "node_root_child_1_child_0_child_2_child_1_child_1",
                          "label": "If disease progression",
                          "type": "condition",
                          "search_term": null,
                          "children": [
                            {
                              "id": "node_root_child_1_child_0_child_2_child_1_child_1_child_0",
                              "label": "See Therapy for Relapsed/Refractory Disease",
                              "type": "condition",
                              "search_term": "See Therapy Relapsed/Refractory Disease",
                              "children": []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "AML_7": {
    "root": {
      "id": "node_root",
      "label": "APL",
      "type": "condition",
      "search_term": "APL",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "First relapse (morphologic or molecular)",
          "type": "condition",
          "search_term": "First",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Early relapse (<6 mo) after ATRA and arsenic trioxide (no anthracycline)",
              "type": "condition",
              "search_term": "Early ATRA",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Therapy for relapse",
                  "type": "condition",
                  "search_term": "Therapy",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_0_child_0",
                      "label": "Anthracycline-based regimen as per APL-3",
                      "type": "condition",
                      "search_term": "Anthracycline-based APL-3",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_1",
                      "label": "Gemtuzumab ozogamicin",
                      "type": "condition",
                      "search_term": "Gemtuzumab",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "No prior exposure to arsenic trioxide OR early relapse (<6 mo) after ATRA + anthracycline-containing regimen",
              "type": "condition",
              "search_term": "ATRA",
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "Therapy for relapse",
                  "type": "condition",
                  "search_term": "Therapy",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_0_child_0",
                      "label": "Arsenic trioxide ATRA gemtuzumab ozogamicin",
                      "type": "condition",
                      "search_term": "Arsenic ATRA gemtuzumab",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_0_child_2",
              "label": "Late relapse (≥6 mo) after arsenic trioxide-containing regimen",
              "type": "condition",
              "search_term": "Late",
              "children": [
                {
                  "id": "node_root_child_0_child_2_child_0",
                  "label": "Therapy for relapse",
                  "type": "condition",
                  "search_term": "Therapy",
                  "children": [
                    {
                      "id": "node_root_child_0_child_2_child_0_child_0",
                      "label": "Arsenic trioxide ATRA (anthracycline or gemtuzumab ozogamicin)",
                      "type": "condition",
                      "search_term": "Arsenic ATRA gemtuzumab",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Second remission (morphologic)",
          "type": "condition",
          "search_term": "Second",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Additional therapy",
              "type": "condition",
              "search_term": "Additional",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Consider CNS prophylaxis",
                  "type": "condition",
                  "search_term": "Consider CNS",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_0_child_0",
                      "label": "IT chemotherapy (methotrexate or cytarabine)",
                      "type": "condition",
                      "search_term": "IT chemotherapy",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "PCR result (by BM)",
                  "type": "condition",
                  "search_term": "PCR BM)",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_1_child_0",
                      "label": "PCR negative",
                      "type": "condition",
                      "search_term": "PCR",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_1_child_0_child_0",
                          "label": "Transplant candidate",
                          "type": "condition",
                          "search_term": "Transplant",
                          "children": [
                            {
                              "id": "node_root_child_1_child_0_child_1_child_0_child_0_child_0",
                              "label": "Autologous HCT",
                              "type": "condition",
                              "search_term": "Autologous HCT",
                              "children": []
                            }
                          ]
                        },
                        {
                          "id": "node_root_child_1_child_0_child_1_child_0_child_1",
                          "label": "Not transplant candidate",
                          "type": "condition",
                          "search_term": null,
                          "children": [
                            {
                              "id": "node_root_child_1_child_0_child_1_child_0_child_1_child_0",
                              "label": "Arsenic trioxide consolidation (total of 6 cycles)",
                              "type": "condition",
                              "search_term": "Arsenic",
                              "children": []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_0_child_1_child_1",
                      "label": "PCR positive",
                      "type": "condition",
                      "search_term": "PCR",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_1_child_1_child_0",
                          "label": "Transplant candidate",
                          "type": "condition",
                          "search_term": "Transplant",
                          "children": [
                            {
                              "id": "node_root_child_1_child_0_child_1_child_1_child_0_child_0",
                              "label": "Matched sibling or alternative donor HCT",
                              "type": "condition",
                              "search_term": "Matched HCT",
                              "children": []
                            }
                          ]
                        },
                        {
                          "id": "node_root_child_1_child_0_child_1_child_1_child_1",
                          "label": "Not transplant candidate",
                          "type": "condition",
                          "search_term": null,
                          "children": [
                            {
                              "id": "node_root_child_1_child_0_child_1_child_1_child_1_child_0",
                              "label": "Clinical trial",
                              "type": "condition",
                              "search_term": "Clinical",
                              "children": []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_2",
          "label": "No remission",
          "type": "condition",
          "search_term": null,
          "children": [
            {
              "id": "node_root_child_2_child_0",
              "label": "Next steps",
              "type": "condition",
              "search_term": "Next",
              "children": [
                {
                  "id": "node_root_child_2_child_0_child_0",
                  "label": "Clinical trial",
                  "type": "condition",
                  "search_term": "Clinical",
                  "children": []
                },
                {
                  "id": "node_root_child_2_child_0_child_1",
                  "label": "Matched sibling or alternative donor HCT",
                  "type": "condition",
                  "search_term": "Matched HCT",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "B-cell_Lymphomas_10": {
    "root": {
      "id": "node_root",
      "label": "Clinical Staging",
      "type": "condition",
      "search_term": "Clinical Staging",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "CIS, Ta, T1",
          "type": "condition",
          "search_term": "CIS, Ta, T1",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Additional Workup",
              "type": "condition",
              "search_term": "Additional Workup",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Repeat TUR followed by intraurethral chemotherapy or BCG (selected cases)",
                  "type": "condition",
                  "search_term": "Repeat TUR chemotherapy BCG",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "T2",
          "type": "condition",
          "search_term": "T2",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Male",
              "type": "condition",
              "search_term": "Male",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Pendulous urethra",
                  "type": "condition",
                  "search_term": "Pendulous",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_0_child_0",
                      "label": "Primary Treatment",
                      "type": "treatment",
                      "search_term": "Primary Treatment",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_0_child_0_child_0",
                          "label": "Distal urethrectomy or Partial penectomy",
                          "type": "condition",
                          "search_term": "Distal Partial",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_0_child_0_child_1",
                      "label": "Adjuvant Treatment",
                      "type": "treatment",
                      "search_term": "Adjuvant Treatment",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_0_child_1_child_0",
                          "label": "Positive margin",
                          "type": "condition",
                          "search_term": "Positive",
                          "children": [
                            {
                              "id": "node_root_child_1_child_0_child_0_child_1_child_0_child_0",
                              "label": "Additional surgery or Chemoradiotherapy, (preferred) or RT",
                              "type": "condition",
                              "search_term": "Additional Chemoradiotherapy, RT",
                              "children": []
                            }
                          ]
                        },
                        {
                          "id": "node_root_child_1_child_0_child_0_child_1_child_1",
                          "label": "Negative margin",
                          "type": "condition",
                          "search_term": "Negative",
                          "children": [
                            {
                              "id": "node_root_child_1_child_0_child_0_child_1_child_1_child_0",
                              "label": "Follow-up imaging with cystoscopy",
                              "type": "condition",
                              "search_term": "Follow-up",
                              "children": []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_0_child_0_child_2",
                      "label": "Therapy for Recurrence",
                      "type": "condition",
                      "search_term": "Therapy Recurrence",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_0_child_2_child_0",
                          "label": "Systemic therapy,, and/or Total penectomy and/or RT",
                          "type": "condition",
                          "search_term": "Systemic Total RT",
                          "children": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "Bulbar urethra",
                  "type": "condition",
                  "search_term": "Bulbar",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_1_child_0",
                      "label": "Primary Treatment",
                      "type": "treatment",
                      "search_term": "Primary Treatment",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_1_child_0_child_0",
                          "label": "Urethrectomy cystoprostatectomy",
                          "type": "condition",
                          "search_term": "Urethrectomy",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_0_child_1_child_1",
                      "label": "Adjuvant Treatment",
                      "type": "treatment",
                      "search_term": "Adjuvant Treatment",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_1_child_1_child_0",
                          "label": "pT1/pT2 and pN0",
                          "type": "condition",
                          "search_term": null,
                          "children": [
                            {
                              "id": "node_root_child_1_child_0_child_1_child_1_child_0_child_0",
                              "label": "Follow-up imaging with cystoscopy",
                              "type": "condition",
                              "search_term": "Follow-up",
                              "children": []
                            }
                          ]
                        },
                        {
                          "id": "node_root_child_1_child_0_child_1_child_1_child_1",
                          "label": "pT3/pT4 or pN1/pN2",
                          "type": "condition",
                          "search_term": null,
                          "children": [
                            {
                              "id": "node_root_child_1_child_0_child_1_child_1_child_1_child_0",
                              "label": "Consider chemotherapy, or Chemoradiotherapy",
                              "type": "condition",
                              "search_term": "Consider Chemoradiotherapy",
                              "children": []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_0_child_1_child_2",
                      "label": "Therapy for Recurrence",
                      "type": "condition",
                      "search_term": "Therapy Recurrence",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_1_child_2_child_0",
                          "label": "Systemic therapy,, and/or RT",
                          "type": "condition",
                          "search_term": "Systemic RT",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_1_child_1",
              "label": "Female",
              "type": "condition",
              "search_term": "Female",
              "children": [
                {
                  "id": "node_root_child_1_child_1_child_0",
                  "label": "Primary Treatment",
                  "type": "treatment",
                  "search_term": "Primary Treatment",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_0_child_0",
                      "label": "Chemoradiotherapy",
                      "type": "condition",
                      "search_term": "Chemoradiotherapy",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_0_child_1",
                      "label": "or Urethrectomy + cystectomy",
                      "type": "condition",
                      "search_term": "Urethrectomy",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_0_child_2",
                      "label": "or Distal urethrectomy (depending on tumor location)",
                      "type": "condition",
                      "search_term": "Distal",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_1_child_1",
                  "label": "Adjuvant Treatment",
                  "type": "treatment",
                  "search_term": "Adjuvant Treatment",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_1_child_0",
                      "label": "Follow-up imaging with cystoscopy",
                      "type": "condition",
                      "search_term": "Follow-up",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_1_child_2",
                  "label": "Therapy for Recurrence",
                  "type": "condition",
                  "search_term": "Therapy Recurrence",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_2_child_0",
                      "label": "Systemic therapy",
                      "type": "condition",
                      "search_term": "Systemic",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_2_child_1",
                      "label": "or Chemoradiotherapy, (if no prior RT)",
                      "type": "condition",
                      "search_term": "Chemoradiotherapy, RT)",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_2_child_2",
                      "label": "or Pelvic exenteration (category 2B)",
                      "type": "condition",
                      "search_term": "Pelvic",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Bone_6": {
    "root": {
      "id": "node_root",
      "label": "Surveillance",
      "type": "next",
      "search_term": "Surveillance",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Physical exam",
          "type": "condition",
          "search_term": "Physical",
          "children": []
        },
        {
          "id": "node_root_child_1",
          "label": "Imaging of primary site, timing, and modality, as clinically indicated (e.g., x-ray, MRI with and without contrast CT with contrast) for up to 10 years",
          "type": "condition",
          "search_term": "Imaging MRI CT",
          "children": []
        },
        {
          "id": "node_root_child_2",
          "label": "Chest imaging every 6 months may include CT annually for 5 years, then annually thereafter, as clinically indicated",
          "type": "condition",
          "search_term": "Chest CT",
          "children": []
        }
      ]
    }
  },
  "Bone_8": {
    "root": {
      "id": "node_root",
      "label": "Stable/Improved Disease Following Primary Treatment",
      "type": "treatment",
      "search_term": "Stable/Improved Disease Following Primary Treatment",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Local Control Therapy",
          "type": "condition",
          "search_term": "Local Control Therapy",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Options",
              "type": "condition",
              "search_term": "Options",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0_6103",
                  "label": "Wide excision",
                  "type": "condition",
                  "search_term": "Wide",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_0_6103_child_0",
                      "label": "Margins",
                      "type": "condition",
                      "search_term": "Margins",
                      "children": [
                        {
                          "id": "node_root_child_0_child_0_child_0_6103_child_0_child_0",
                          "label": "Positive margins",
                          "type": "condition",
                          "search_term": "Positive",
                          "children": [
                            {
                              "id": "node_root_child_0_child_0_child_0_6103_child_0_child_0_child_0",
                              "label": "Continue chemotherapy, (category 1) followed by RT",
                              "type": "condition",
                              "search_term": "Continue RT",
                              "children": []
                            },
                            {
                              "id": "node_root_child_0_child_0_child_0_6103_child_0_child_0_child_1",
                              "label": "or RT and chemotherapy, (category 1, for chemotherapy)",
                              "type": "condition",
                              "search_term": "RT",
                              "children": []
                            }
                          ]
                        },
                        {
                          "id": "node_root_child_0_child_0_child_0_6103_child_0_child_1",
                          "label": "Negative margins",
                          "type": "condition",
                          "search_term": "Negative",
                          "children": [
                            {
                              "id": "node_root_child_0_child_0_child_0_6103_child_0_child_1_child_0",
                              "label": "Chemotherapy, (category 1)",
                              "type": "condition",
                              "search_term": "Chemotherapy,",
                              "children": []
                            },
                            {
                              "id": "node_root_child_0_child_0_child_0_6103_child_0_child_1_child_1",
                              "label": "Consider RT for pelvic tumors",
                              "type": "condition",
                              "search_term": "Consider RT",
                              "children": []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_0_child_1_6109",
                  "label": "Definitive RT and chemotherapy",
                  "type": "condition",
                  "search_term": "Definitive RT chemotherapy",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_2_6630",
                  "label": "Amputation in selected cases",
                  "type": "condition",
                  "search_term": "Amputation",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_2_6630_child_0",
                      "label": "Postoperative chemotherapy (category 1)",
                      "type": "condition",
                      "search_term": "Postoperative chemotherapy",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_2_6630_child_1",
                      "label": "Consider RT depending on margin status",
                      "type": "condition",
                      "search_term": "Consider RT",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Adjuvant Treatment/Additional Therapy",
          "type": "treatment",
          "search_term": "Adjuvant Treatment/Additional Therapy",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Follows respective local control therapy approach",
              "type": "condition",
              "search_term": "Follows",
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_2",
          "label": "Surveillance",
          "type": "next",
          "search_term": "Surveillance",
          "children": [
            {
              "id": "node_root_child_2_child_0",
              "label": "Physical exam",
              "type": "condition",
              "search_term": "Physical",
              "children": []
            },
            {
              "id": "node_root_child_2_child_1",
              "label": "Contrast-enhanced MRI CT of primary site",
              "type": "condition",
              "search_term": "Contrast-enhanced MRI CT",
              "children": []
            },
            {
              "id": "node_root_child_2_child_2",
              "label": "Chest imaging (x-ray or CT) every 3 months",
              "type": "condition",
              "search_term": "Chest CT)",
              "children": []
            },
            {
              "id": "node_root_child_2_child_3",
              "label": "X-rays of primary site",
              "type": "condition",
              "search_term": "X-rays",
              "children": []
            },
            {
              "id": "node_root_child_2_child_4",
              "label": "Complete blood count (CBC) and other laboratory studies as indicated",
              "type": "condition",
              "search_term": "Complete",
              "children": []
            },
            {
              "id": "node_root_child_2_child_5",
              "label": "Increase intervals for physical exam, imaging of primary site and chest after 24 months and annually after 5 years, as clinically indicated (indefinitely) (category 2B)",
              "type": "condition",
              "search_term": "Increase",
              "children": []
            },
            {
              "id": "node_root_child_2_child_6",
              "label": "Consider FDG-PET/CT (head-to-toe) or bone scan",
              "type": "condition",
              "search_term": "Consider FDG-PET/CT",
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_3",
          "label": "Progressive Disease/Relapse",
          "type": "condition",
          "search_term": "Progressive Disease/Relapse",
          "children": [
            {
              "id": "node_root_child_3_child_0",
              "label": "Relapse",
              "type": "condition",
              "search_term": "Relapse",
              "children": [
                {
                  "id": "node_root_child_3_child_0_child_0",
                  "label": "Chemotherapy RT surgery",
                  "type": "condition",
                  "search_term": "Chemotherapy RT",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Bone_9": {
    "root": {
      "id": "node_root",
      "label": "Metastatic Ewing Sarcoma",
      "type": "condition",
      "search_term": "Metastatic Ewing Sarcoma",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Local Control Therapy to Primary Site",
          "type": "condition",
          "search_term": "Local Control Therapy Primary Site",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Approach",
              "type": "condition",
              "search_term": "Approach",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0_6103",
                  "label": "Wide excision",
                  "type": "condition",
                  "search_term": "Wide",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_0_6103_child_0",
                      "label": "Margins",
                      "type": "condition",
                      "search_term": "Margins",
                      "children": [
                        {
                          "id": "node_root_child_0_child_0_child_0_6103_child_0_child_0",
                          "label": "Positive margins",
                          "type": "condition",
                          "search_term": "Positive",
                          "children": [
                            {
                              "id": "node_root_child_0_child_0_child_0_6103_child_0_child_0_child_0",
                              "label": "Continue chemotherapy, (category 1) followed by RT",
                              "type": "condition",
                              "search_term": "Continue RT",
                              "children": []
                            },
                            {
                              "id": "node_root_child_0_child_0_child_0_6103_child_0_child_0_child_1",
                              "label": "or RT and chemotherapy, (category 1, for chemotherapy)",
                              "type": "condition",
                              "search_term": "RT",
                              "children": []
                            }
                          ]
                        },
                        {
                          "id": "node_root_child_0_child_0_child_0_6103_child_0_child_1",
                          "label": "Negative margins",
                          "type": "condition",
                          "search_term": "Negative",
                          "children": [
                            {
                              "id": "node_root_child_0_child_0_child_0_6103_child_0_child_1_child_0",
                              "label": "Chemotherapy, (category 1)",
                              "type": "condition",
                              "search_term": "Chemotherapy,",
                              "children": []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_0_child_1_6109",
                  "label": "Definitive RT and chemotherapy",
                  "type": "condition",
                  "search_term": "Definitive RT chemotherapy",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "Metastases",
              "type": "condition",
              "search_term": "Metastases",
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "Oligometastatic disease",
                  "type": "condition",
                  "search_term": "Oligometastatic",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_0_child_0",
                      "label": "Excision of metastases or RT",
                      "type": "condition",
                      "search_term": "Excision RT",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_1_child_1",
                  "label": "Lung only partial response",
                  "type": "condition",
                  "search_term": "Lung",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_1_child_0",
                      "label": "Excision whole lung irradiation (WLI)",
                      "type": "condition",
                      "search_term": "Excision",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_1_child_2",
                  "label": "Lung only complete response",
                  "type": "condition",
                  "search_term": "Lung",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_2_child_0",
                      "label": "Consider WLI",
                      "type": "condition",
                      "search_term": "Consider WLI",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Widely Metastatic",
          "type": "condition",
          "search_term": "Widely Metastatic",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Options",
              "type": "condition",
              "search_term": "Options",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Continuing chemotherapy, only with palliative surgery",
                  "type": "condition",
                  "search_term": "Continuing",
                  "children": []
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "Palliative RT to symptomatic areas",
                  "type": "condition",
                  "search_term": "Palliative RT",
                  "children": []
                },
                {
                  "id": "node_root_child_1_child_0_child_2",
                  "label": "Other techniques for multiple metastases",
                  "type": "condition",
                  "search_term": null,
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Breast_1": {
    "root": {
      "id": "node_root",
      "label": "Locoregional Treatment of cT1–3, cN0 or cN+, M0 Disease: Breast-Conserving Surgery (BCS) + Whole Breast RT",
      "type": "treatment",
      "search_term": "Locoregional Treatment M0 Disease: Breast-Conserving Surgery Whole Breast RT",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Surgery",
          "type": "condition",
          "search_term": "Surgery",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Procedure",
              "type": "condition",
              "search_term": "Procedure",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "BCS, surgical axillary staging category 1",
                  "type": "condition",
                  "search_term": "BCS,",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "Options",
              "type": "condition",
              "search_term": "Options",
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "oncoplastic reconstruction",
                  "type": "condition",
                  "search_term": null,
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Adjuvant Systemic Therapy",
          "type": "condition",
          "search_term": "Adjuvant Systemic Therapy",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Guidelines",
              "type": "condition",
              "search_term": "Guidelines",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "to determine whether adjuvant systemic therapy is indicated.",
                  "type": "condition",
                  "search_term": null,
                  "children": []
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "RT is typically given after systemic therapy.",
                  "type": "condition",
                  "search_term": "RT",
                  "children": []
                },
                {
                  "id": "node_root_child_1_child_0_child_2",
                  "label": "See BINV-I for sequencing of systemic therapy and RT.",
                  "type": "condition",
                  "search_term": "See BINV-I RT.",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_2",
          "label": "Nodal Status",
          "type": "condition",
          "search_term": "Nodal Status",
          "children": [
            {
              "id": "node_root_child_2_child_0",
              "label": "pN0 or cN0",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_2_child_0_child_0",
                  "label": "RT",
                  "type": "condition",
                  "search_term": "RT",
                  "children": [
                    {
                      "id": "node_root_child_2_child_0_child_0_child_0",
                      "label": "Whole breast RT boost to tumor bed",
                      "type": "condition",
                      "search_term": "Whole RT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_0_child_0_child_1",
                      "label": "Consider comprehensive RNI in patients with central/medial tumors, pT3 tumors, or pT2 tumors and one of: grade 3, extensive lymphovascular invasion (LVI), or hormone-receptor (HR)-negative",
                      "type": "condition",
                      "search_term": "Consider RNI",
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_0_child_0_child_2",
                      "label": "Consider APBI/PBI in selected low-risk patients (category 1)",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_0_child_0_child_3",
                      "label": "Consider omitting breast irradiation if adjuvant endocrine therapy is planned and ALL of the following (category 1)",
                      "type": "condition",
                      "search_term": "Consider ALL",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_2_child_1",
              "label": "pN1a (1–3 positive axillary nodes)",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_2_child_1_child_0",
                  "label": "Meets ALL of the following",
                  "type": "condition",
                  "search_term": "Meets ALL",
                  "children": [
                    {
                      "id": "node_root_child_2_child_1_child_0_child_0",
                      "label": "cT1–T3, cN0",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_1_child_0_child_1",
                      "label": "No preoperative chemotherapy",
                      "type": "condition",
                      "search_term": "chemotherapy",
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_1_child_0_child_2",
                      "label": "1–2 positive sentinel lymph nodes (SLNs)",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_1_child_0_child_3",
                      "label": "Whole breast RT planned",
                      "type": "condition",
                      "search_term": "Whole RT",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_2_child_1_child_1",
                  "label": "RT",
                  "type": "condition",
                  "search_term": "RT",
                  "children": [
                    {
                      "id": "node_root_child_2_child_1_child_1_child_0",
                      "label": "Yes to all",
                      "type": "condition",
                      "search_term": "Yes",
                      "children": [
                        {
                          "id": "node_root_child_2_child_1_child_1_child_0_child_0",
                          "label": "Whole breast RT boost (use of comprehensive RNI with or without intentional inclusion of axilla at discretion of radiation oncologist) (category 1)",
                          "type": "condition",
                          "search_term": "Whole RT RNI radiation",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_2_child_1_child_1_child_1",
                      "label": "No",
                      "type": "condition",
                      "search_term": null,
                      "children": [
                        {
                          "id": "node_root_child_2_child_1_child_1_child_1_child_0",
                          "label": "Whole breast RT with inclusion of any portion of the undissected axilla at risk boost to tumor bed (category 1). Strongly consider comprehensive RNI.",
                          "type": "condition",
                          "search_term": null,
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_2_child_2",
              "label": "pN2–3 (≥4 positive axillary nodes)",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_2_child_2_child_0",
                  "label": "RT",
                  "type": "condition",
                  "search_term": "RT",
                  "children": [
                    {
                      "id": "node_root_child_2_child_2_child_0_child_0",
                      "label": "Whole breast RT boost to tumor bed (category 1) + comprehensive RNI, including any portion of the undissected axilla at risk (category 1)",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Breast_10": {
    "root": {
      "id": "node_root",
      "label": "Operable disease: Surgical treatment and adjuvant therapy after preoperative systemic treatment",
      "type": "treatment",
      "search_term": "Operable Surgical",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "BCS possible",
          "type": "condition",
          "search_term": "BCS",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Surgical Treatment",
              "type": "treatment",
              "search_term": "Surgical Treatment",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Procedure",
                  "type": "condition",
                  "search_term": "Procedure",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_0_child_0",
                      "label": "BCS with surgical axillary staging",
                      "type": "condition",
                      "search_term": "BCS",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_0_child_1",
                  "label": "Options",
                  "type": "condition",
                  "search_term": "Options",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_1_child_0",
                      "label": "oncoplastic reconstruction",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "Adjuvant Systemic Therapy and RT",
              "type": "condition",
              "search_term": "Adjuvant Systemic Therapy RT",
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "Adjuvant systemic therapy",
                  "type": "condition",
                  "search_term": "Adjuvant",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_0_child_0",
                      "label": "cN+ and ypN0",
                      "type": "condition",
                      "search_term": null,
                      "children": [
                        {
                          "id": "node_root_child_0_child_1_child_0_child_0_child_0",
                          "label": "Adjuvant whole breast RT boost to the tumor bed",
                          "type": "condition",
                          "search_term": "Adjuvant RT",
                          "children": []
                        },
                        {
                          "id": "node_root_child_0_child_1_child_0_child_0_child_1",
                          "label": "Strongly consider comprehensive RNI with inclusion of any portion of the undissected axilla at risk.zz",
                          "type": "condition",
                          "search_term": null,
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_0_child_1_child_0_child_1",
                      "label": "Any ypN+",
                      "type": "condition",
                      "search_term": "Any",
                      "children": [
                        {
                          "id": "node_root_child_0_child_1_child_0_child_1_child_0",
                          "label": "Adjuvant whole breast RT boost to the tumor bed",
                          "type": "condition",
                          "search_term": "Adjuvant RT",
                          "children": []
                        },
                        {
                          "id": "node_root_child_0_child_1_child_0_child_1_child_1",
                          "label": "Comprehensive RNI with inclusion of any portion of the undissected axilla at risk",
                          "type": "condition",
                          "search_term": null,
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_0_child_1_child_0_child_2",
                      "label": "Any cN0, ypN0",
                      "type": "condition",
                      "search_term": "Any",
                      "children": [
                        {
                          "id": "node_root_child_0_child_1_child_0_child_2_child_0",
                          "label": "Adjuvant whole breast RT boost to tumor bed",
                          "type": "condition",
                          "search_term": "Adjuvant RT",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "BCS not possible",
          "type": "condition",
          "search_term": "BCS",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Surgical Treatment",
              "type": "treatment",
              "search_term": "Surgical Treatment",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Procedure",
                  "type": "condition",
                  "search_term": "Procedure",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_0_child_0",
                      "label": "Mastectomy and surgical axillary staging",
                      "type": "condition",
                      "search_term": "Mastectomy",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "Options",
                  "type": "condition",
                  "search_term": "Options",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_1_child_0",
                      "label": "reconstruction",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_1_child_1",
              "label": "Adjuvant Systemic Therapy and RT",
              "type": "condition",
              "search_term": "Adjuvant Systemic Therapy RT",
              "children": [
                {
                  "id": "node_root_child_1_child_1_child_0",
                  "label": "Adjuvant systemic therapy",
                  "type": "condition",
                  "search_term": "Adjuvant",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_0_child_0",
                      "label": "cN+ and ypN0",
                      "type": "condition",
                      "search_term": null,
                      "children": [
                        {
                          "id": "node_root_child_1_child_1_child_0_child_0_child_0",
                          "label": "PMRT",
                          "type": "condition",
                          "search_term": "PMRT",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_1_child_0_child_0_child_1",
                          "label": "Strongly consider PMRT to chest wall and comprehensive RNI with inclusion of any portion of the undissected axilla at risk.zz",
                          "type": "condition",
                          "search_term": null,
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_1_child_0_child_1",
                      "label": "Any ypN+",
                      "type": "condition",
                      "search_term": "Any",
                      "children": [
                        {
                          "id": "node_root_child_1_child_1_child_0_child_1_child_0",
                          "label": "PMRT to chest wall",
                          "type": "condition",
                          "search_term": "PMRT",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_1_child_0_child_1_child_1",
                          "label": "Comprehensive RNI with inclusion of any portion of the undissected axilla at risk",
                          "type": "condition",
                          "search_term": null,
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_1_child_0_child_2",
                      "label": "cT4, any N",
                      "type": "condition",
                      "search_term": "N",
                      "children": [
                        {
                          "id": "node_root_child_1_child_1_child_0_child_2_child_0",
                          "label": "RT to chest wall",
                          "type": "condition",
                          "search_term": "RT",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_1_child_0_child_2_child_1",
                          "label": "Comprehensive RNI with inclusion of any portion of the undissected axilla at risk",
                          "type": "condition",
                          "search_term": null,
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_1_child_0_child_3",
                      "label": "cT3, cN0, and ypN0",
                      "type": "condition",
                      "search_term": null,
                      "children": [
                        {
                          "id": "node_root_child_1_child_1_child_0_child_3_child_0",
                          "label": "Consider PMRT to the chest wall",
                          "type": "condition",
                          "search_term": "Consider PMRT",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_1_child_0_child_3_child_1",
                          "label": "Comprehensive RNI with inclusion of any portion of the undissected axilla at risk",
                          "type": "condition",
                          "search_term": null,
                          "children": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_1_child_1",
                  "label": "Adjuvant systemic therapy, no PMRT",
                  "type": "condition",
                  "search_term": "Adjuvant PMRT",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_1_child_0",
                      "label": "Any cN0, ypN0",
                      "type": "condition",
                      "search_term": "Any",
                      "children": [
                        {
                          "id": "node_root_child_1_child_1_child_1_child_0_child_0",
                          "label": "If axilla was assessed by SLNB or axillary node dissection",
                          "type": "condition",
                          "search_term": "SLNB",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Breast_11": {
    "root": {
      "id": "node_root",
      "label": "Preoperative systemic therapy (BINV-L 1)",
      "type": "condition",
      "search_term": "Preoperative",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Response to preoperative systemic therapy and tumor is operable",
          "type": "condition",
          "search_term": "Response",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Locoregional treatment and adjuvant therapy",
              "type": "treatment",
              "search_term": "Locoregional",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Surgical treatment options",
                  "type": "treatment",
                  "search_term": "Surgical",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_0_child_0",
                      "label": "Mastectomy and surgical axillary staging + reconstruction (optional)",
                      "type": "condition",
                      "search_term": "Mastectomy",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_1",
                      "label": "BCS with surgical axillary staging oncoplastic reconstruction",
                      "type": "condition",
                      "search_term": "BCS",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_0_child_1",
                  "label": "Adjuvant treatment",
                  "type": "treatment",
                  "search_term": "Adjuvant",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_1_child_0",
                      "label": "Systemic therapy",
                      "type": "condition",
                      "search_term": "Systemic",
                      "children": [
                        {
                          "id": "node_root_child_0_child_0_child_1_child_0_child_0",
                          "label": "Adjuvant systemic therapy",
                          "type": "condition",
                          "search_term": "Adjuvant",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_0_child_0_child_1_child_1",
                      "label": "Radiation",
                      "type": "condition",
                      "search_term": "Radiation",
                      "children": [
                        {
                          "id": "node_root_child_0_child_0_child_1_child_1_child_0",
                          "label": "Adjuvant RT to the whole breast or chest wall and comprehensive RNI with inclusion of any portion of the undissected axilla at risk.",
                          "type": "condition",
                          "search_term": null,
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "No response to preoperative systemic therapy and/or tumor remains inoperable",
          "type": "condition",
          "search_term": null,
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Next steps",
              "type": "condition",
              "search_term": "Next",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Consider",
                  "type": "condition",
                  "search_term": "Consider",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_0_child_0",
                      "label": "Additional systemic therapy and/or preoperative radiation",
                      "type": "condition",
                      "search_term": "Additional radiation",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "Reassess",
                  "type": "condition",
                  "search_term": "Reassess",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_1_child_0",
                      "label": "Response to preoperative systemic therapy and tumor is operable",
                      "type": "condition",
                      "search_term": "Response",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_1_child_0_child_0",
                          "label": "Follow pathway",
                          "type": "condition",
                          "search_term": "Follow",
                          "children": [
                            {
                              "id": "node_root_child_1_child_0_child_1_child_0_child_0_child_0",
                              "label": "Follow pathway above",
                              "type": "condition",
                              "search_term": "Follow",
                              "children": []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_0_child_1_child_1",
                      "label": "No response to preoperative systemic therapy and tumor is inoperable",
                      "type": "condition",
                      "search_term": null,
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_1_child_1_child_0",
                          "label": "Next step",
                          "type": "condition",
                          "search_term": "Next",
                          "children": [
                            {
                              "id": "node_root_child_1_child_0_child_1_child_1_child_0_child_0",
                              "label": "Individualize treatment",
                              "type": "condition",
                              "search_term": "Individualize",
                              "children": []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Breast_18": {
    "root": {
      "id": "node_root",
      "label": "Reconstruction based on planned adjuvant RT",
      "type": "condition",
      "search_term": "Reconstruction RT",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Implant-based reconstruction planned",
          "type": "condition",
          "search_term": "Implant-based",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "2 stage: tissue expander followed by permanent implant (prepectoral, partial submuscular, or total submuscular tissue expander)",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Options",
                  "type": "condition",
                  "search_term": "Options",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_0_child_0",
                      "label": "Tissue expansion followed by exchange to implant prior to the initiation of RT",
                      "type": "condition",
                      "search_term": "Tissue RT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_1",
                      "label": "Tissue expansion followed by RT and delayed exchange to implant ≥6 months after completion of RT",
                      "type": "condition",
                      "search_term": "Tissue RT RT",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "1 stage: direct to implant",
              "type": "condition",
              "search_term": null,
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Autologous reconstruction planned",
          "type": "condition",
          "search_term": "Autologous",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Options",
              "type": "condition",
              "search_term": "Options",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Immediate autologous reconstruction",
                  "type": "condition",
                  "search_term": "Immediate",
                  "children": []
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "Delayed reconstruction ≥6 months after the completion of RT",
                  "type": "condition",
                  "search_term": "Delayed RT",
                  "children": []
                },
                {
                  "id": "node_root_child_1_child_0_child_2",
                  "label": "Place tissue expander at the time of surgery, followed by expansion, RT, and delayed autologous reconstruction ≥6 months after completion of RT",
                  "type": "condition",
                  "search_term": "Place RT, RT",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Breast_19": {
    "root": {
      "id": "node_root",
      "label": "Reconstruction based on prior history of RT",
      "type": "condition",
      "search_term": "Reconstruction RT",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Recurrent carcinoma after breast conservation including RT",
          "type": "condition",
          "search_term": "Recurrent RT",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Step",
              "type": "condition",
              "search_term": "Step",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Assess soft tissue preoperatively and intraoperatively",
                  "type": "condition",
                  "search_term": "Assess",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "If soft tissue is adequate",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "Options",
                  "type": "condition",
                  "search_term": "Options",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_0_child_0",
                      "label": "Autologous (preferred) or combination",
                      "type": "condition",
                      "search_term": "Autologous",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_1_child_0_child_1",
                      "label": "1 stage: direct to implant",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_1_child_0_child_2",
                      "label": "2 stage: tissue expander followed by implant",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_0_child_2",
              "label": "If soft tissue is inadequate",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_0_child_2_child_0",
                  "label": "Options",
                  "type": "condition",
                  "search_term": "Options",
                  "children": [
                    {
                      "id": "node_root_child_0_child_2_child_0_child_0",
                      "label": "Autologous (preferred) or combination",
                      "type": "condition",
                      "search_term": "Autologous",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Delayed reconstruction after mastectomy and RT",
          "type": "condition",
          "search_term": "Delayed RT",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Step",
              "type": "condition",
              "search_term": "Step",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Assess soft tissue preoperatively and intraoperatively",
                  "type": "condition",
                  "search_term": "Assess",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_1_child_1",
              "label": "If soft tissue is adequate",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_1_child_1_child_0",
                  "label": "Options",
                  "type": "condition",
                  "search_term": "Options",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_0_child_0",
                      "label": "Autologous (preferred) or combination",
                      "type": "condition",
                      "search_term": "Autologous",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_0_child_1",
                      "label": "2 stage: tissue expander followed by implant or autologous tissue",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_1_child_2",
              "label": "If soft tissue is inadequate",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_1_child_2_child_0",
                  "label": "Options",
                  "type": "condition",
                  "search_term": "Options",
                  "children": [
                    {
                      "id": "node_root_child_1_child_2_child_0_child_0",
                      "label": "Autologous (preferred) or combination",
                      "type": "condition",
                      "search_term": "Autologous",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Breast_2": {
    "root": {
      "id": "node_root",
      "label": "Locoregional Treatment of cT1–3, cN0 or cN+, M0 Disease: Mastectomy PMRT",
      "type": "treatment",
      "search_term": "Locoregional Treatment M0 Disease: Mastectomy PMRT",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Surgery",
          "type": "condition",
          "search_term": "Surgery",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Procedure",
              "type": "condition",
              "search_term": "Procedure",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Nipple-sparing, skin-sparing, or total mastectomy with surgical axillary staging, (category 1)",
                  "type": "condition",
                  "search_term": "Nipple-sparing,",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "Options",
              "type": "condition",
              "search_term": "Options",
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "reconstruction",
                  "type": "condition",
                  "search_term": null,
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Adjuvant Systemic Therapy",
          "type": "condition",
          "search_term": "Adjuvant Systemic Therapy",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Guidelines",
              "type": "condition",
              "search_term": "Guidelines",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "to determine whether adjuvant systemic therapy is indicated.",
                  "type": "condition",
                  "search_term": null,
                  "children": []
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "RT is typically given after systemic therapy.",
                  "type": "condition",
                  "search_term": "RT",
                  "children": []
                },
                {
                  "id": "node_root_child_1_child_0_child_2",
                  "label": "See BINV-I for sequencing of systemic therapy and RT.",
                  "type": "condition",
                  "search_term": "See BINV-I RT.",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_2",
          "label": "Pathologic Nodal Status",
          "type": "condition",
          "search_term": "Pathologic Nodal Status",
          "children": [
            {
              "id": "node_root_child_2_child_0",
              "label": "Negative axillary nodes and ≤pT2 (≤5 cm) and margins ≥1 mm",
              "type": "condition",
              "search_term": "Negative",
              "children": [
                {
                  "id": "node_root_child_2_child_0_child_0",
                  "label": "RT",
                  "type": "condition",
                  "search_term": "RT",
                  "children": [
                    {
                      "id": "node_root_child_2_child_0_child_0_child_0",
                      "label": "No RT",
                      "type": "condition",
                      "search_term": "RT",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_2_child_1",
              "label": "Negative axillary nodes and ≤pT2 (≤5 cm) and negative margins but <1 mm",
              "type": "condition",
              "search_term": "Negative",
              "children": [
                {
                  "id": "node_root_child_2_child_1_child_0",
                  "label": "RT",
                  "type": "condition",
                  "search_term": "RT",
                  "children": [
                    {
                      "id": "node_root_child_2_child_1_child_0_child_0",
                      "label": "Consider PMRT to chest wall",
                      "type": "condition",
                      "search_term": "Consider PMRT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_1_child_0_child_1",
                      "label": "For patients with additional high-risk features, consider addition of comprehensive RNI (including any portion of the undissected axilla at risk)",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_2_child_2",
              "label": "Negative axillary nodes and pT3 (>5 cm)",
              "type": "condition",
              "search_term": "Negative",
              "children": [
                {
                  "id": "node_root_child_2_child_2_child_0",
                  "label": "RT",
                  "type": "condition",
                  "search_term": "RT",
                  "children": [
                    {
                      "id": "node_root_child_2_child_2_child_0_child_0",
                      "label": "Consider PMRT to chest wall comprehensive RNI (including any portion of the undissected axilla at risk)",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_2_child_3",
              "label": "1–3 positive axillary nodes",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_2_child_3_child_0",
                  "label": "RT",
                  "type": "condition",
                  "search_term": "RT",
                  "children": [
                    {
                      "id": "node_root_child_2_child_3_child_0_child_0",
                      "label": "Strongly consider PMRT to chest wall + comprehensive RNI (including any portion of the undissected axilla at risk)",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_2_child_4",
              "label": "≥4 positive axillary nodes",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_2_child_4_child_0",
                  "label": "RT",
                  "type": "condition",
                  "search_term": "RT",
                  "children": [
                    {
                      "id": "node_root_child_2_child_4_child_0_child_0",
                      "label": "PMRT to chest wall + comprehensive RNI (including any portion of the undissected axilla at risk) (category 1)",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_2_child_5",
              "label": "Margins positive",
              "type": "condition",
              "search_term": "Margins",
              "children": [
                {
                  "id": "node_root_child_2_child_5_child_0",
                  "label": "RT",
                  "type": "condition",
                  "search_term": "RT",
                  "children": [
                    {
                      "id": "node_root_child_2_child_5_child_0_child_0",
                      "label": "Re-excision to negative margins is preferred",
                      "type": "condition",
                      "search_term": "Re-excision",
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_5_child_0_child_1",
                      "label": "If not feasible, then strongly consider PMRT to chest wall comprehensive RNI (including any portion of the undissected axilla at risk)",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Breast_20": {
    "root": {
      "id": "node_root",
      "label": "Reconstruction based on no or unknown history of RT or unknown need for postmastectomy RT",
      "type": "condition",
      "search_term": "Reconstruction RT RT",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Immediate placement of tissue expander at the time of mastectomy (prepectoral, partial submuscular, total submuscular tissue expander placement)",
          "type": "condition",
          "search_term": "Immediate",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Adjuvant chemotherapy planned",
              "type": "condition",
              "search_term": "Adjuvant chemotherapy",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Tissue expansion during chemotherapy",
                  "type": "condition",
                  "search_term": "Tissue chemotherapy",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_0_child_0",
                      "label": "RT planned",
                      "type": "condition",
                      "search_term": "RT",
                      "children": [
                        {
                          "id": "node_root_child_0_child_0_child_0_child_0_child_0",
                          "label": "Options",
                          "type": "condition",
                          "search_term": "Options",
                          "children": [
                            {
                              "id": "node_root_child_0_child_0_child_0_child_0_child_0_child_0",
                              "label": "Exchange tissue expander to permanent implant (prior to initiation of RT, if no delay to initiation of RT or ≥6 months after RT)",
                              "type": "condition",
                              "search_term": "Exchange RT, RT RT)",
                              "children": []
                            },
                            {
                              "id": "node_root_child_0_child_0_child_0_child_0_child_0_child_1",
                              "label": "Conversion to autologous tissue reconstruction ≥6 months after RT",
                              "type": "condition",
                              "search_term": "Conversion RT",
                              "children": []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_1",
                      "label": "No RT planned",
                      "type": "condition",
                      "search_term": "RT",
                      "children": [
                        {
                          "id": "node_root_child_0_child_0_child_0_child_1_child_0",
                          "label": "Options",
                          "type": "condition",
                          "search_term": "Options",
                          "children": [
                            {
                              "id": "node_root_child_0_child_0_child_0_child_1_child_0_child_0",
                              "label": "Exchange tissue expander to implant",
                              "type": "condition",
                              "search_term": "Exchange",
                              "children": []
                            },
                            {
                              "id": "node_root_child_0_child_0_child_0_child_1_child_0_child_1",
                              "label": "Convert to autologous tissue reconstruction",
                              "type": "condition",
                              "search_term": "Convert",
                              "children": []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "No adjuvant chemotherapy planned",
              "type": "condition",
              "search_term": "chemotherapy",
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "RT planned",
                  "type": "condition",
                  "search_term": "RT",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_0_child_0",
                      "label": "Tissue expansion followed by",
                      "type": "condition",
                      "search_term": "Tissue",
                      "children": [
                        {
                          "id": "node_root_child_0_child_1_child_0_child_0_child_0",
                          "label": "RT; conversion to permanent implant or autologous tissue ≥6 months after completion of RT (category 2B)",
                          "type": "condition",
                          "search_term": "RT; RT",
                          "children": []
                        },
                        {
                          "id": "node_root_child_0_child_1_child_0_child_0_child_1",
                          "label": "Exchange to permanent implant before RT (if no delay to initiation of RT)",
                          "type": "condition",
                          "search_term": "Exchange RT RT)",
                          "children": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_1_child_1",
                  "label": "No RT planned",
                  "type": "condition",
                  "search_term": "RT",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_1_child_0",
                      "label": "Tissue expansion followed by",
                      "type": "condition",
                      "search_term": "Tissue",
                      "children": [
                        {
                          "id": "node_root_child_0_child_1_child_1_child_0_child_0",
                          "label": "Exchange to permanent implant",
                          "type": "condition",
                          "search_term": "Exchange",
                          "children": []
                        },
                        {
                          "id": "node_root_child_0_child_1_child_1_child_0_child_1",
                          "label": "Autologous tissue reconstruction",
                          "type": "condition",
                          "search_term": "Autologous",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "1 stage: direct to implant OR immediate autologous reconstruction or latissimus dorsi with implant at time of mastectomy",
          "type": "condition",
          "search_term": null,
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Action",
              "type": "condition",
              "search_term": "Action",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Consider revisional surgeries to the ipsilateral or contralateral breast after RT if needed",
                  "type": "condition",
                  "search_term": "Consider RT",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_2",
          "label": "Delayed reconstruction",
          "type": "condition",
          "search_term": "Delayed",
          "children": [
            {
              "id": "node_root_child_2_child_0",
              "label": "RT required",
              "type": "condition",
              "search_term": "RT",
              "children": [
                {
                  "id": "node_root_child_2_child_0_child_0",
                  "label": "Reconstruction Based on History of RT (BINV-H 3)",
                  "type": "condition",
                  "search_term": "Reconstruction Based History RT",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_2_child_1",
              "label": "RT not required",
              "type": "condition",
              "search_term": "RT",
              "children": [
                {
                  "id": "node_root_child_2_child_1_child_0",
                  "label": "Reconstruction with implant, autologous tissue, or a combination",
                  "type": "condition",
                  "search_term": "Reconstruction",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Cervical_6": {
    "root": {
      "id": "node_root",
      "label": "Clinical Stage IIB–IVA",
      "type": "condition",
      "search_term": "Clinical Stage IIB–IVA",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Step",
          "type": "condition",
          "search_term": "Step",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Further radiologic workup for metastatic disease as clinically indicated",
              "type": "condition",
              "search_term": "Further",
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Workup result",
          "type": "condition",
          "search_term": "Workup",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Negative for distant metastasis",
              "type": "condition",
              "search_term": "Negative",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Primary Treatment",
                  "type": "treatment",
                  "search_term": "Primary Treatment",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_0_child_0",
                      "label": "EBRT (external beam radiation therapy)",
                      "type": "condition",
                      "search_term": "EBRT radiation",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_0_child_0_child_1",
                      "label": "Concurrent platinum-containing chemotherapy",
                      "type": "condition",
                      "search_term": "Concurrent chemotherapy",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_0_child_0_child_2",
                      "label": "Brachytherapy",
                      "type": "condition",
                      "search_term": "Brachytherapy",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_0_child_0_child_3",
                      "label": "Pembrolizumab (category 1 for FIGO 2014 Stage IIIA, IIIB, and IVA; category 2B for select FIGO 2018 stage III–IVA)",
                      "type": "condition",
                      "search_term": "Pembrolizumab FIGO Stage IIIA, IIIB, IVA; FIGO III–IVA)",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_1_child_1",
              "label": "Positive for distant metastasis",
              "type": "condition",
              "search_term": "Positive",
              "children": [
                {
                  "id": "node_root_child_1_child_1_child_0",
                  "label": "Step",
                  "type": "condition",
                  "search_term": "Step",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_0_child_0",
                      "label": "Biopsy suspicious areas as indicated",
                      "type": "condition",
                      "search_term": "Biopsy",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_1_child_1",
                  "label": "Biopsy result",
                  "type": "condition",
                  "search_term": "Biopsy",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_1_child_0",
                      "label": "Negative",
                      "type": "condition",
                      "search_term": "Negative",
                      "children": [
                        {
                          "id": "node_root_child_1_child_1_child_1_child_0_child_0",
                          "label": "Primary Treatment",
                          "type": "treatment",
                          "search_term": "Primary Treatment",
                          "children": [
                            {
                              "id": "node_root_child_1_child_1_child_1_child_0_child_0_child_0",
                              "label": "EBRT (external beam radiation therapy)",
                              "type": "condition",
                              "search_term": "EBRT radiation",
                              "children": []
                            },
                            {
                              "id": "node_root_child_1_child_1_child_1_child_0_child_0_child_1",
                              "label": "Concurrent platinum-containing chemotherapy",
                              "type": "condition",
                              "search_term": "Concurrent chemotherapy",
                              "children": []
                            },
                            {
                              "id": "node_root_child_1_child_1_child_1_child_0_child_0_child_2",
                              "label": "Brachytherapy",
                              "type": "condition",
                              "search_term": "Brachytherapy",
                              "children": []
                            },
                            {
                              "id": "node_root_child_1_child_1_child_1_child_0_child_0_child_3",
                              "label": "Pembrolizumab (category 1 for FIGO 2014 Stage IIIA, IIIB, and IVA; category 2B for select FIGO 2018 stage III–IVA)",
                              "type": "condition",
                              "search_term": "Pembrolizumab FIGO Stage IIIA, IIIB, IVA; FIGO III–IVA)",
                              "children": []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_1_child_1_child_1",
                      "label": "Positive",
                      "type": "condition",
                      "search_term": "Positive",
                      "children": [
                        {
                          "id": "node_root_child_1_child_1_child_1_child_1_child_0",
                          "label": "Primary Treatment",
                          "type": "treatment",
                          "search_term": "Primary Treatment",
                          "children": [
                            {
                              "id": "node_root_child_1_child_1_child_1_child_1_child_0_child_0",
                              "label": "Systemic therapy",
                              "type": "condition",
                              "search_term": "Systemic",
                              "children": []
                            },
                            {
                              "id": "node_root_child_1_child_1_child_1_child_1_child_0_child_1",
                              "label": "Individualized RT",
                              "type": "condition",
                              "search_term": "Individualized RT",
                              "children": []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "CML_3": {
    "root": {
      "id": "node_root",
      "label": "Advanced phase CML",
      "type": "condition",
      "search_term": "Advanced",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Treatment considerations",
          "type": "treatment",
          "search_term": "Treatment",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Disease progression to advanced phase while on TKI therapy has worse prognosis than de novo advanced phase CML",
              "type": "condition",
              "search_term": "Disease TKI",
              "children": []
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "Evaluation for allogeneic HCT as indicated",
              "type": "condition",
              "search_term": "Evaluation HCT",
              "children": []
            },
            {
              "id": "node_root_child_0_child_2",
              "label": "Selection of TKI is based on prior therapy and/or BCR::ABL1 mutation profile",
              "type": "condition",
              "search_term": null,
              "children": []
            },
            {
              "id": "node_root_child_0_child_3",
              "label": "CNS involvement has been described in BP-CML. Lumbar puncture and CNS prophylaxis is recommended for lymphoid BP-CML",
              "type": "condition",
              "search_term": "CNS BP-CML. Lumbar CNS BP-CML",
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Subtype",
          "type": "condition",
          "search_term": "Subtype",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "AP-CML",
              "type": "condition",
              "search_term": "AP-CML",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Treatment",
                  "type": "treatment",
                  "search_term": "Treatment",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_0_child_0",
                      "label": "Options",
                      "type": "condition",
                      "search_term": "Options",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_0_child_0_child_0",
                          "label": "Clinical trial",
                          "type": "condition",
                          "search_term": "Clinical",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_0_child_0_child_0_child_1",
                          "label": "Preferred regimens: 2G TKI (Bosutinib, Dasatinib, or Nilotinib) or 3G TKI (Ponatinib)",
                          "type": "condition",
                          "search_term": "Preferred TKI Dasatinib, Nilotinib) TKI",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_0_child_0_child_1",
                      "label": "Useful in certain circumstances",
                      "type": "condition",
                      "search_term": "Useful",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_0_child_1_child_0",
                          "label": "1G TKI (Imatinib) if 2G or 3G TKI is contraindicated",
                          "type": "condition",
                          "search_term": "TKI TKI",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_0_child_0_child_1_child_1",
                          "label": "Allosteric TKI (Asciminib)",
                          "type": "condition",
                          "search_term": "Allosteric TKI",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_0_child_0_child_2",
                      "label": "If lack of response or disease progression",
                      "type": "condition",
                      "search_term": null,
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_0_child_2_child_0",
                          "label": "Allogeneic HCT",
                          "type": "condition",
                          "search_term": "Allogeneic HCT",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_1_child_1",
              "label": "BP-CML",
              "type": "condition",
              "search_term": "BP-CML",
              "children": [
                {
                  "id": "node_root_child_1_child_1_child_0",
                  "label": "Lineage",
                  "type": "condition",
                  "search_term": "Lineage",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_0_child_0",
                      "label": "Lymphoid",
                      "type": "condition",
                      "search_term": "Lymphoid",
                      "children": [
                        {
                          "id": "node_root_child_1_child_1_child_0_child_0_child_0",
                          "label": "Treatment",
                          "type": "treatment",
                          "search_term": "Treatment",
                          "children": [
                            {
                              "id": "node_root_child_1_child_1_child_0_child_0_child_0_child_0",
                              "label": "Options",
                              "type": "condition",
                              "search_term": "Options",
                              "children": [
                                {
                                  "id": "node_root_child_1_child_1_child_0_child_0_child_0_child_0_child_0",
                                  "label": "Clinical trial",
                                  "type": "condition",
                                  "search_term": "Clinical",
                                  "children": []
                                },
                                {
                                  "id": "node_root_child_1_child_1_child_0_child_0_child_0_child_0_child_1",
                                  "label": "Preferred regimens: ALL-type induction chemotherapy (NCCN Guidelines for ALL) + TKI",
                                  "type": "condition",
                                  "search_term": "Preferred ALL-type chemotherapy Guidelines ALL) TKI",
                                  "children": []
                                }
                              ]
                            },
                            {
                              "id": "node_root_child_1_child_1_child_0_child_0_child_0_child_1",
                              "label": "Useful in certain circumstances",
                              "type": "condition",
                              "search_term": "Useful",
                              "children": [
                                {
                                  "id": "node_root_child_1_child_1_child_0_child_0_child_0_child_1_child_0",
                                  "label": "TKI + steroids (if not a candidate for induction chemotherapy)",
                                  "type": "condition",
                                  "search_term": "TKI",
                                  "children": []
                                }
                              ]
                            },
                            {
                              "id": "node_root_child_1_child_1_child_0_child_0_child_0_child_2",
                              "label": "For patients in remission",
                              "type": "condition",
                              "search_term": null,
                              "children": [
                                {
                                  "id": "node_root_child_1_child_1_child_0_child_0_child_0_child_2_child_0",
                                  "label": "Allogeneic HCT",
                                  "type": "condition",
                                  "search_term": "Allogeneic HCT",
                                  "children": []
                                },
                                {
                                  "id": "node_root_child_1_child_1_child_0_child_0_child_0_child_2_child_1",
                                  "label": "Consolidation chemotherapy and TKI maintenance for non-candidates for allogeneic HCT",
                                  "type": "condition",
                                  "search_term": "Consolidation chemotherapy TKI HCT",
                                  "children": []
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_1_child_0_child_1",
                      "label": "Myeloid",
                      "type": "condition",
                      "search_term": "Myeloid",
                      "children": [
                        {
                          "id": "node_root_child_1_child_1_child_0_child_1_child_0",
                          "label": "Treatment",
                          "type": "treatment",
                          "search_term": "Treatment",
                          "children": [
                            {
                              "id": "node_root_child_1_child_1_child_0_child_1_child_0_child_0",
                              "label": "Options",
                              "type": "condition",
                              "search_term": "Options",
                              "children": [
                                {
                                  "id": "node_root_child_1_child_1_child_0_child_1_child_0_child_0_child_0",
                                  "label": "Clinical trial",
                                  "type": "condition",
                                  "search_term": "Clinical",
                                  "children": []
                                },
                                {
                                  "id": "node_root_child_1_child_1_child_0_child_1_child_0_child_0_child_1",
                                  "label": "Preferred regimens: AML-type induction chemotherapy (NCCN Guidelines for AML) + TKI",
                                  "type": "condition",
                                  "search_term": "Preferred AML-type chemotherapy Guidelines AML) TKI",
                                  "children": []
                                }
                              ]
                            },
                            {
                              "id": "node_root_child_1_child_1_child_0_child_1_child_0_child_1",
                              "label": "Useful in certain circumstances",
                              "type": "condition",
                              "search_term": "Useful",
                              "children": [
                                {
                                  "id": "node_root_child_1_child_1_child_0_child_1_child_0_child_1_child_0",
                                  "label": "TKI (if not a candidate for induction chemotherapy)",
                                  "type": "condition",
                                  "search_term": "TKI",
                                  "children": []
                                }
                              ]
                            },
                            {
                              "id": "node_root_child_1_child_1_child_0_child_1_child_0_child_2",
                              "label": "For patients in remission",
                              "type": "condition",
                              "search_term": null,
                              "children": [
                                {
                                  "id": "node_root_child_1_child_1_child_0_child_1_child_0_child_2_child_0",
                                  "label": "Allogeneic HCT",
                                  "type": "condition",
                                  "search_term": "Allogeneic HCT",
                                  "children": []
                                },
                                {
                                  "id": "node_root_child_1_child_1_child_0_child_1_child_0_child_2_child_1",
                                  "label": "Consolidation chemotherapy and TKI maintenance for non-candidates for allogeneic HCT",
                                  "type": "condition",
                                  "search_term": "Consolidation chemotherapy TKI HCT",
                                  "children": []
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "CNS_17": {
    "root": {
      "id": "node_root",
      "label": "Follow-up",
      "type": "condition",
      "search_term": "Follow-up",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Brain MRI schedule",
          "type": "condition",
          "search_term": "Brain MRI",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Every 3 months for 2 years",
              "type": "condition",
              "search_term": "Every",
              "children": []
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "Then every 6–12 months for 5–10 years",
              "type": "condition",
              "search_term": "Then",
              "children": []
            },
            {
              "id": "node_root_child_0_child_2",
              "label": "Then every 1–2 years or as clinically indicated",
              "type": "condition",
              "search_term": "Then",
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Spine imaging",
          "type": "condition",
          "search_term": "Spine",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "For patients with previous spine disease, perform concurrent spine imaging as clinically indicated",
              "type": "condition",
              "search_term": null,
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_2",
          "label": "If recurrent disease",
          "type": "condition",
          "search_term": null,
          "children": [
            {
              "id": "node_root_child_2_child_0",
              "label": "Clinical staging",
              "type": "condition",
              "search_term": "Clinical",
              "children": [
                {
                  "id": "node_root_child_2_child_0_child_0",
                  "label": "Brain and spine MRI",
                  "type": "condition",
                  "search_term": "Brain MRI",
                  "children": []
                },
                {
                  "id": "node_root_child_2_child_0_child_1",
                  "label": "CSF analysis",
                  "type": "condition",
                  "search_term": "CSF",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_2_child_1",
              "label": "Findings",
              "type": "condition",
              "search_term": "Findings",
              "children": [
                {
                  "id": "node_root_child_2_child_1_child_0",
                  "label": "Localized brain recurrence",
                  "type": "condition",
                  "search_term": "Localized",
                  "children": [
                    {
                      "id": "node_root_child_2_child_1_child_0_child_0",
                      "label": "Surgery",
                      "type": "condition",
                      "search_term": "Surgery",
                      "children": [
                        {
                          "id": "node_root_child_2_child_1_child_0_child_0_child_0",
                          "label": "Maximum safe resection",
                          "type": "condition",
                          "search_term": "Maximum",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_2_child_1_child_0_child_1",
                      "label": "Post-surgical imaging",
                      "type": "condition",
                      "search_term": "Post-surgical",
                      "children": [
                        {
                          "id": "node_root_child_2_child_1_child_0_child_1_child_0",
                          "label": "Brain and spine MRI",
                          "type": "condition",
                          "search_term": "Brain MRI",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_2_child_1_child_0_child_2",
                      "label": "Treatment for recurrence",
                      "type": "treatment",
                      "search_term": "Treatment",
                      "children": [
                        {
                          "id": "node_root_child_2_child_1_child_0_child_2_child_0",
                          "label": "Systemic therapy and/or Additional radiation after resection",
                          "type": "condition",
                          "search_term": "Systemic Additional radiation",
                          "children": []
                        },
                        {
                          "id": "node_root_child_2_child_1_child_0_child_2_child_1",
                          "label": "High-dose systemic therapy with autologous stem cell reinfusion",
                          "type": "condition",
                          "search_term": "High-dose",
                          "children": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_2_child_1_child_1",
                  "label": "Disseminated disease",
                  "type": "condition",
                  "search_term": "Disseminated",
                  "children": [
                    {
                      "id": "node_root_child_2_child_1_child_1_child_0",
                      "label": "Treatment for recurrence",
                      "type": "treatment",
                      "search_term": "Treatment",
                      "children": [
                        {
                          "id": "node_root_child_2_child_1_child_1_child_0_child_0",
                          "label": "Systemic therapy",
                          "type": "condition",
                          "search_term": "Systemic",
                          "children": []
                        },
                        {
                          "id": "node_root_child_2_child_1_child_1_child_0_child_1",
                          "label": "Palliative/best supportive care, including focal radiation if indicated",
                          "type": "condition",
                          "search_term": "Palliative/best radiation",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "CNS_19": {
    "root": {
      "id": "node_root",
      "label": "Follow-up",
      "type": "condition",
      "search_term": "Follow-up",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Brain MRI",
          "type": "condition",
          "search_term": "Brain MRI",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Every 3 months until 2 years",
              "type": "condition",
              "search_term": "Every",
              "children": []
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "Every 6 months until 5 years",
              "type": "condition",
              "search_term": "Every",
              "children": []
            },
            {
              "id": "node_root_child_0_child_2",
              "label": "Then annually indefinitely",
              "type": "condition",
              "search_term": "Then",
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Additional guidance",
          "type": "condition",
          "search_term": "Additional",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "For patients with previous spine disease: concurrent spine imaging and CSF sampling as clinically indicated",
              "type": "condition",
              "search_term": "CSF",
              "children": []
            },
            {
              "id": "node_root_child_1_child_1",
              "label": "For patients with prior ocular involvement: concurrent ophthalmologic follow-up as clinically indicated",
              "type": "condition",
              "search_term": null,
              "children": []
            }
          ]
        }
      ]
    }
  },
  "CNS_23": {
    "root": {
      "id": "node_root",
      "label": "Patient's disease managed by",
      "type": "condition",
      "search_term": "Patient's",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Observation",
          "type": "condition",
          "search_term": "Observation",
          "children": []
        },
        {
          "id": "node_root_child_1",
          "label": "Maximum safe resection for intradural intramedullary tumor or intradural extramedullary tumor",
          "type": "condition",
          "search_term": "Maximum",
          "children": []
        }
      ]
    }
  },
  "CNS_24": {
    "root": {
      "id": "node_root",
      "label": "Follow-up",
      "type": "condition",
      "search_term": "Follow-up",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "WHO grade 1 and 2 or unresected meningiomas",
          "type": "condition",
          "search_term": "WHO",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Brain MRI",
              "type": "condition",
              "search_term": "Brain MRI",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "At 3, 6, and 12 months",
                  "type": "condition",
                  "search_term": null,
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_1",
                  "label": "Then every 6–12 months for 5 years",
                  "type": "condition",
                  "search_term": "Then",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_2",
                  "label": "Then every 1–3 years as clinically indicated",
                  "type": "condition",
                  "search_term": "Then",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "WHO grade 3 meningiomas",
          "type": "condition",
          "search_term": "WHO",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Brain MRI",
              "type": "condition",
              "search_term": "Brain MRI",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Every 2–4 months for 3 years",
                  "type": "condition",
                  "search_term": "Every",
                  "children": []
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "Then every 3–6 months",
                  "type": "condition",
                  "search_term": "Then",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "CNS_28": {
    "root": {
      "id": "node_root",
      "label": "Recurrence",
      "type": "condition",
      "search_term": "Recurrence",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Relapse",
          "type": "condition",
          "search_term": "Relapse",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Stable systemic disease or reasonable systemic treatment options",
              "type": "treatment",
              "search_term": "Stable",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Treatment Options",
                  "type": "treatment",
                  "search_term": "Treatment Options",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_0_child_0",
                      "label": "Surgery",
                      "type": "condition",
                      "search_term": "Surgery",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_1",
                      "label": "SRS",
                      "type": "condition",
                      "search_term": "SRS",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_2",
                      "label": "HA-WBRT + memantine (if not previously administered)",
                      "type": "condition",
                      "search_term": "HA-WBRT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_3",
                      "label": "WBRT without HA memantine (if not previously administered)",
                      "type": "condition",
                      "search_term": "WBRT HA",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_4",
                      "label": "Laser thermal ablation",
                      "type": "condition",
                      "search_term": "Laser",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_5",
                      "label": "Systemic therapy",
                      "type": "condition",
                      "search_term": "Systemic",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "Systemic disease progression with limited systemic treatment options and poor PS",
              "type": "treatment",
              "search_term": "Systemic PS",
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "No prior WBRT",
                  "type": "condition",
                  "search_term": "WBRT",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_0_child_0",
                      "label": "Treatment Options",
                      "type": "treatment",
                      "search_term": "Treatment Options",
                      "children": [
                        {
                          "id": "node_root_child_0_child_1_child_0_child_0_child_0",
                          "label": "HA-WBRT + memantine",
                          "type": "condition",
                          "search_term": "HA-WBRT",
                          "children": []
                        },
                        {
                          "id": "node_root_child_0_child_1_child_0_child_0_child_1",
                          "label": "WBRT without HA memantine",
                          "type": "condition",
                          "search_term": "WBRT HA",
                          "children": []
                        },
                        {
                          "id": "node_root_child_0_child_1_child_0_child_0_child_2",
                          "label": "SRS in select patients",
                          "type": "condition",
                          "search_term": "SRS",
                          "children": []
                        },
                        {
                          "id": "node_root_child_0_child_1_child_0_child_0_child_3",
                          "label": "Palliative/best supportive care",
                          "type": "condition",
                          "search_term": "Palliative/best",
                          "children": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_1_child_1",
                  "label": "Prior WBRT",
                  "type": "condition",
                  "search_term": "Prior WBRT",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_1_child_0",
                      "label": "Treatment Options",
                      "type": "treatment",
                      "search_term": "Treatment Options",
                      "children": [
                        {
                          "id": "node_root_child_0_child_1_child_1_child_0_child_0",
                          "label": "Reirradiation (if prior positive response to RT)",
                          "type": "condition",
                          "search_term": "Reirradiation RT)",
                          "children": []
                        },
                        {
                          "id": "node_root_child_0_child_1_child_1_child_0_child_1",
                          "label": "SRS in select patients",
                          "type": "condition",
                          "search_term": "SRS",
                          "children": []
                        },
                        {
                          "id": "node_root_child_0_child_1_child_1_child_0_child_2",
                          "label": "Palliative/best supportive care",
                          "type": "condition",
                          "search_term": "Palliative/best",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "CNS_30": {
    "root": {
      "id": "node_root",
      "label": "Follow-up",
      "type": "condition",
      "search_term": "Follow-up",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Brain MRI",
          "type": "condition",
          "search_term": "Brain MRI",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Every 2–3 months for 1–2 years, then every 4–6 months indefinitely",
              "type": "condition",
              "search_term": "Every",
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Recurrence",
          "type": "condition",
          "search_term": "Recurrence",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Recurrent disease",
              "type": "condition",
              "search_term": "Recurrent",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Systemic disease progression with limited systemic treatment options",
                  "type": "treatment",
                  "search_term": "Systemic",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_0_child_0",
                      "label": "Treatment",
                      "type": "treatment",
                      "search_term": "Treatment",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_0_child_0_child_0",
                          "label": "Palliative/best supportive care",
                          "type": "condition",
                          "search_term": "Palliative/best",
                          "children": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "Stable systemic disease or reasonable systemic treatment options",
                  "type": "treatment",
                  "search_term": "Stable",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_1_child_0",
                      "label": "Treatment Options",
                      "type": "treatment",
                      "search_term": "Treatment Options",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_1_child_0_child_0",
                          "label": "Surgery",
                          "type": "condition",
                          "search_term": "Surgery",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_0_child_1_child_0_child_1",
                          "label": "SRS",
                          "type": "condition",
                          "search_term": "SRS",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_0_child_1_child_0_child_2",
                          "label": "HA-WBRT + memantine",
                          "type": "condition",
                          "search_term": "HA-WBRT",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_0_child_1_child_0_child_3",
                          "label": "WBRT without HA memantine",
                          "type": "condition",
                          "search_term": "WBRT HA",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_0_child_1_child_0_child_4",
                          "label": "Systemic therapy",
                          "type": "condition",
                          "search_term": "Systemic",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_0_child_1_child_1",
                      "label": "Follow-up",
                      "type": "condition",
                      "search_term": "Follow-up",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_1_child_1_child_0",
                          "label": "Brain MRI every 2–3 months for 1–2 years, then every 4–6 months indefinitely",
                          "type": "condition",
                          "search_term": "Brain MRI",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "CNS_31": {
    "root": {
      "id": "node_root",
      "label": "CSF cytology negative",
      "type": "condition",
      "search_term": "CSF",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Treatment",
          "type": "treatment",
          "search_term": "Treatment",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Continue on current therapy (systemic or intra-CSF) and re-evaluate CSF cytology every 4–8 weeks",
              "type": "condition",
              "search_term": "Continue CSF",
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Next step",
          "type": "condition",
          "search_term": "Next",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Maintenance therapy",
              "type": "next",
              "search_term": "Maintenance",
              "children": []
            },
            {
              "id": "node_root_child_1_child_1",
              "label": "Monitor CSF cytology",
              "type": "condition",
              "search_term": "Monitor CSF",
              "children": [
                {
                  "id": "node_root_child_1_child_1_child_0",
                  "label": "every 4–8 weeks",
                  "type": "condition",
                  "search_term": null,
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "CNS_34": {
    "root": {
      "id": "node_root",
      "label": "Follow-up",
      "type": "condition",
      "search_term": "Follow-up",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Spine MRI/CT",
          "type": "condition",
          "search_term": "Spine MRI/CT",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "1–3 months after treatment, then every 3–4 months for 1 year, then as clinically indicated",
              "type": "condition",
              "search_term": null,
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Presentation (Symptom- or MRI-based)",
          "type": "condition",
          "search_term": "Presentation MRI-based)",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Progressive disease or Recurrent disease",
              "type": "condition",
              "search_term": "Progressive Recurrent",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "If previously treated with RT or Surgery and RT",
                  "type": "condition",
                  "search_term": "RT Surgery RT",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_0_child_0",
                      "label": "Treatment for recurrence or progressive disease",
                      "type": "treatment",
                      "search_term": "Treatment",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_0_child_0_child_0",
                          "label": "Surgery or SBRT",
                          "type": "condition",
                          "search_term": "Surgery SBRT",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_0_child_0_child_0_child_1",
                          "label": "Reirradiation if recurrent",
                          "type": "condition",
                          "search_term": "Reirradiation",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_0_child_0_child_0_child_2",
                          "label": "Radioablation/augmentation for recurrent painful lesions",
                          "type": "condition",
                          "search_term": "Radioablation/augmentation",
                          "children": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "If previously treated with Systemic therapy",
                  "type": "condition",
                  "search_term": "Systemic",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_1_child_0",
                      "label": "Treatment for recurrence or progressive disease",
                      "type": "treatment",
                      "search_term": "Treatment",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_1_child_0_child_0",
                          "label": "Consider surgery + RT",
                          "type": "condition",
                          "search_term": "Consider RT",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "CNS_6": {
    "root": {
      "id": "node_root",
      "label": "Recurrent or progressive disease",
      "type": "condition",
      "search_term": "Recurrent",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Tumor types",
          "type": "condition",
          "search_term": "Tumor",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "WHO grade 1 circumscribed glioma",
              "type": "condition",
              "search_term": "WHO",
              "children": []
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "WHO grade 2 PXA, circumscribed glioma",
              "type": "condition",
              "search_term": "WHO PXA,",
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Prior fractionated external beam RT (EBRT)",
          "type": "condition",
          "search_term": "Prior RT",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Resectable",
              "type": "condition",
              "search_term": "Resectable",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Procedure",
                  "type": "condition",
                  "search_term": "Procedure",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_0_child_0",
                      "label": "Surgery",
                      "type": "condition",
                      "search_term": "Surgery",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_0_child_0_child_1",
                      "label": "Brain MRI",
                      "type": "condition",
                      "search_term": "Brain MRI",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "Treatment options",
                  "type": "treatment",
                  "search_term": "Treatment",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_1_child_0",
                      "label": "Consider clinical trial (preferred for eligible patients)",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_0_child_1_child_1",
                      "label": "Start systemic therapy",
                      "type": "condition",
                      "search_term": "Start",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_0_child_1_child_2",
                      "label": "Change to a different systemic therapy",
                      "type": "condition",
                      "search_term": "Change",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_0_child_1_child_3",
                      "label": "Consider reirradiation with highly focused RT systemic therapy in select cases",
                      "type": "condition",
                      "search_term": "Consider RT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_0_child_1_child_4",
                      "label": "Consider observation for gross totally resected tumors",
                      "type": "condition",
                      "search_term": "Consider",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_0_child_1_child_5",
                      "label": "Palliative/best supportive care",
                      "type": "condition",
                      "search_term": "Palliative/best",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_1_child_1",
              "label": "Unresectable",
              "type": "condition",
              "search_term": "Unresectable",
              "children": [
                {
                  "id": "node_root_child_1_child_1_child_0",
                  "label": "Procedure",
                  "type": "condition",
                  "search_term": "Procedure",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_0_child_0",
                      "label": "Consider biopsy",
                      "type": "condition",
                      "search_term": "Consider",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_1_child_1",
                  "label": "Treatment options",
                  "type": "treatment",
                  "search_term": "Treatment",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_1_child_0",
                      "label": "Consider clinical trial (preferred for eligible patients)",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_1_child_1",
                      "label": "Start systemic therapy",
                      "type": "condition",
                      "search_term": "Start",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_1_child_2",
                      "label": "Change to a different systemic therapy",
                      "type": "condition",
                      "search_term": "Change",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_1_child_3",
                      "label": "Consider reirradiation with highly focused RT systemic therapy in select cases",
                      "type": "condition",
                      "search_term": "Consider RT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_1_child_4",
                      "label": "Consider observation for gross totally resected tumors",
                      "type": "condition",
                      "search_term": "Consider",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_1_child_5",
                      "label": "Palliative/best supportive care",
                      "type": "condition",
                      "search_term": "Palliative/best",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_2",
          "label": "No prior fractionated EBRT",
          "type": "condition",
          "search_term": "EBRT",
          "children": [
            {
              "id": "node_root_child_2_child_0",
              "label": "Resectable",
              "type": "condition",
              "search_term": "Resectable",
              "children": [
                {
                  "id": "node_root_child_2_child_0_child_0",
                  "label": "Procedure",
                  "type": "condition",
                  "search_term": "Procedure",
                  "children": [
                    {
                      "id": "node_root_child_2_child_0_child_0_child_0",
                      "label": "Surgery",
                      "type": "condition",
                      "search_term": "Surgery",
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_0_child_0_child_1",
                      "label": "Brain MRI",
                      "type": "condition",
                      "search_term": "Brain MRI",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_2_child_0_child_1",
                  "label": "Treatment options",
                  "type": "treatment",
                  "search_term": "Treatment",
                  "children": [
                    {
                      "id": "node_root_child_2_child_0_child_1_child_0",
                      "label": "Consider clinical trial (preferred for eligible patients)",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_0_child_1_child_1",
                      "label": "Standard RT for circumscribed tumors",
                      "type": "condition",
                      "search_term": "Standard RT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_0_child_1_child_2",
                      "label": "Standard RT + adjuvant PCV",
                      "type": "condition",
                      "search_term": "Standard RT PCV",
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_0_child_1_child_3",
                      "label": "Standard RT + adjuvant TMZ",
                      "type": "condition",
                      "search_term": "Standard RT TMZ",
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_0_child_1_child_4",
                      "label": "Standard RT + concurrent and adjuvant TMZ",
                      "type": "condition",
                      "search_term": "Standard RT TMZ",
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_0_child_1_child_5",
                      "label": "Systemic therapy (category 2B)",
                      "type": "condition",
                      "search_term": "Systemic",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_2_child_1",
              "label": "Unresectable",
              "type": "condition",
              "search_term": "Unresectable",
              "children": [
                {
                  "id": "node_root_child_2_child_1_child_0",
                  "label": "Procedure",
                  "type": "condition",
                  "search_term": "Procedure",
                  "children": [
                    {
                      "id": "node_root_child_2_child_1_child_0_child_0",
                      "label": "Consider biopsy",
                      "type": "condition",
                      "search_term": "Consider",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_2_child_1_child_1",
                  "label": "Treatment options",
                  "type": "treatment",
                  "search_term": "Treatment",
                  "children": [
                    {
                      "id": "node_root_child_2_child_1_child_1_child_0",
                      "label": "Consider clinical trial (preferred for eligible patients)",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_1_child_1_child_1",
                      "label": "Standard RT for circumscribed tumors",
                      "type": "condition",
                      "search_term": "Standard RT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_1_child_1_child_2",
                      "label": "Standard RT + adjuvant PCV",
                      "type": "condition",
                      "search_term": "Standard RT PCV",
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_1_child_1_child_3",
                      "label": "Standard RT + adjuvant TMZ",
                      "type": "condition",
                      "search_term": "Standard RT TMZ",
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_1_child_1_child_4",
                      "label": "Standard RT + concurrent and adjuvant TMZ",
                      "type": "condition",
                      "search_term": "Standard RT TMZ",
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_1_child_1_child_5",
                      "label": "Systemic therapy (category 2B)",
                      "type": "condition",
                      "search_term": "Systemic",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Colorectal_6": {
    "root": {
      "id": "node_root",
      "label": "Recurrence",
      "type": "condition",
      "search_term": "Recurrence",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Serial CEA elevation",
          "type": "condition",
          "search_term": "Serial CEA",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Workup",
              "type": "condition",
              "search_term": "Workup",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Physical exam",
                  "type": "condition",
                  "search_term": "Physical",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_1",
                  "label": "Colonoscopy",
                  "type": "condition",
                  "search_term": "Colonoscopy",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_2",
                  "label": "C/A/P CT with contrast",
                  "type": "condition",
                  "search_term": "C/A/P CT",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "Findings",
              "type": "condition",
              "search_term": "Findings",
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "Negative findings",
                  "type": "condition",
                  "search_term": "Negative",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_0_child_0",
                      "label": "Next step",
                      "type": "condition",
                      "search_term": "Next",
                      "children": [
                        {
                          "id": "node_root_child_0_child_1_child_0_child_0_child_0",
                          "label": "Consider FDG-PET/CT",
                          "type": "condition",
                          "search_term": "Consider FDG-PET/CT",
                          "children": []
                        },
                        {
                          "id": "node_root_child_0_child_1_child_0_child_0_child_1",
                          "label": "Re-evaluate C/A/P CT with contrast in 3 months",
                          "type": "condition",
                          "search_term": "Re-evaluate C/A/P CT",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_0_child_1_child_0_child_1",
                      "label": "Further findings",
                      "type": "condition",
                      "search_term": "Further",
                      "children": [
                        {
                          "id": "node_root_child_0_child_1_child_0_child_1_child_0",
                          "label": "Negative findings",
                          "type": "condition",
                          "search_term": "Negative",
                          "children": [
                            {
                              "id": "node_root_child_0_child_1_child_0_child_1_child_0_child_0",
                              "label": "End of path",
                              "type": "condition",
                              "search_term": "End",
                              "children": []
                            }
                          ]
                        },
                        {
                          "id": "node_root_child_0_child_1_child_0_child_1_child_1",
                          "label": "Positive findings",
                          "type": "condition",
                          "search_term": "Positive",
                          "children": [
                            {
                              "id": "node_root_child_0_child_1_child_0_child_1_child_1_child_0",
                              "label": "See treatment for documented metachronous metastases",
                              "type": "condition",
                              "search_term": "See",
                              "children": []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_1_child_1",
                  "label": "Positive findings",
                  "type": "condition",
                  "search_term": "Positive",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_1_child_0",
                      "label": "See treatment for documented metachronous metastases",
                      "type": "condition",
                      "search_term": "See",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Esophageal_16": {
    "root": {
      "id": "node_root",
      "label": "Unresectable locally advanced, Locally recurrent or Metastatic disease",
      "type": "condition",
      "search_term": "Unresectable Locally Metastatic",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Performance Status",
          "type": "condition",
          "search_term": "Performance Status",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Karnofsky performance score ≥60% or ECOG performance score ≤2",
              "type": "condition",
              "search_term": "Karnofsky ECOG",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Next step",
                  "type": "condition",
                  "search_term": "Next",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_0_child_0",
                      "label": "Perform microsatellite, PD-L1, HER2, and CLDN18.2 testing (if not done previously)",
                      "type": "condition",
                      "search_term": "Perform PD-L1, HER2, CLDN18.2",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_1",
                      "label": "NGS should be considered via validated assay",
                      "type": "condition",
                      "search_term": "NGS",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_0_child_1",
                  "label": "Palliative Management",
                  "type": "condition",
                  "search_term": "Palliative Management",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_1_child_0",
                      "label": "Systemic therapy",
                      "type": "condition",
                      "search_term": "Systemic",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_1_child_1",
                      "label": "Palliative/Best supportive care",
                      "type": "condition",
                      "search_term": "Palliative/Best",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "Karnofsky performance score <60% or ECOG performance score ≥3",
              "type": "condition",
              "search_term": "Karnofsky ECOG",
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "Palliative Management",
                  "type": "condition",
                  "search_term": "Palliative Management",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_0_child_0",
                      "label": "Palliative/Best supportive care",
                      "type": "condition",
                      "search_term": "Palliative/Best",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Esophageal_17": {
    "root": {
      "id": "node_root",
      "label": "Confirm diagnosis",
      "type": "condition",
      "search_term": "Confirm",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "No high-risk features",
          "type": "condition",
          "search_term": null,
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Lesion size < 15 mm",
              "type": "condition",
              "search_term": "Lesion",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Treatment",
                  "type": "treatment",
                  "search_term": "Treatment",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_0_child_0",
                      "label": "ER (with either endoscopic submucosal dissection [ESD] or endoscopic mucosal resection [EMR]) ablation",
                      "type": "condition",
                      "search_term": "ER",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_0_child_1",
                  "label": "Next step",
                  "type": "condition",
                  "search_term": "Next",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_1_child_0",
                      "label": "Assess for curative resection",
                      "type": "condition",
                      "search_term": "Assess",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "Lesion size ≥ 15 mm",
              "type": "condition",
              "search_term": "Lesion",
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "Treatment",
                  "type": "treatment",
                  "search_term": "Treatment",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_0_child_0",
                      "label": "ESD ablation",
                      "type": "condition",
                      "search_term": "ESD",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_1_child_1",
                  "label": "Next step",
                  "type": "condition",
                  "search_term": "Next",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_1_child_0",
                      "label": "Assess for curative resection",
                      "type": "condition",
                      "search_term": "Assess",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Endoscopic (ulcerated) or pathologic (poorly differentiated or LVI) high-risk features",
          "type": "condition",
          "search_term": null,
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Treatment",
              "type": "treatment",
              "search_term": "Treatment",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Esophagectomy for patients who are medically fit (preferred)",
                  "type": "condition",
                  "search_term": "Esophagectomy",
                  "children": []
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "Preoperative or definitive chemoradiation",
                  "type": "condition",
                  "search_term": "Preoperative",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Esophageal_18": {
    "root": {
      "id": "node_root",
      "label": "Confirm diagnosis",
      "type": "condition",
      "search_term": "Confirm",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Flat neoplasia (no nodule or mass)",
          "type": "condition",
          "search_term": "Flat",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Diagnosis",
              "type": "condition",
              "search_term": "Diagnosis",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "HGD",
                  "type": "condition",
                  "search_term": "HGD",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_1",
                  "label": "Early carcinoma",
                  "type": "condition",
                  "search_term": "Early",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "Treatment",
              "type": "treatment",
              "search_term": "Treatment",
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "ER (with either ESD or EMR) ablation",
                  "type": "condition",
                  "search_term": "ER ESD EMR)",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_1_child_1",
                  "label": "Ablation",
                  "type": "condition",
                  "search_term": "Ablation",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Visible lesion present",
          "type": "condition",
          "search_term": "Visible",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Diagnosis",
              "type": "condition",
              "search_term": "Diagnosis",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "HGD",
                  "type": "condition",
                  "search_term": "HGD",
                  "children": []
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "Early carcinoma",
                  "type": "condition",
                  "search_term": "Early",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_1_child_1",
              "label": "Nodule/mass size < 2 cm",
              "type": "condition",
              "search_term": "Nodule/mass",
              "children": [
                {
                  "id": "node_root_child_1_child_1_child_0",
                  "label": "Treatment",
                  "type": "treatment",
                  "search_term": "Treatment",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_0_child_0",
                      "label": "ER (with either ESD or EMR) ablation",
                      "type": "condition",
                      "search_term": "ER ESD EMR)",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_1_child_1",
                  "label": "Next step",
                  "type": "condition",
                  "search_term": "Next",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_1_child_0",
                      "label": "Assess for curative resection",
                      "type": "condition",
                      "search_term": "Assess",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_1_child_2",
              "label": "Nodule/mass size ≥ 2 cm",
              "type": "condition",
              "search_term": "Nodule/mass",
              "children": [
                {
                  "id": "node_root_child_1_child_2_child_0",
                  "label": "Biopsy features",
                  "type": "condition",
                  "search_term": "Biopsy",
                  "children": [
                    {
                      "id": "node_root_child_1_child_2_child_0_child_0",
                      "label": "No high-risk biopsy features",
                      "type": "condition",
                      "search_term": null,
                      "children": [
                        {
                          "id": "node_root_child_1_child_2_child_0_child_0_child_0",
                          "label": "Treatment",
                          "type": "treatment",
                          "search_term": "Treatment",
                          "children": [
                            {
                              "id": "node_root_child_1_child_2_child_0_child_0_child_0_child_0",
                              "label": "ESD ablation",
                              "type": "condition",
                              "search_term": "ESD",
                              "children": []
                            },
                            {
                              "id": "node_root_child_1_child_2_child_0_child_0_child_0_child_1",
                              "label": "Esophagectomy (for patients who are medically fit)",
                              "type": "condition",
                              "search_term": "Esophagectomy",
                              "children": []
                            }
                          ]
                        },
                        {
                          "id": "node_root_child_1_child_2_child_0_child_0_child_1",
                          "label": "Next step",
                          "type": "condition",
                          "search_term": "Next",
                          "children": [
                            {
                              "id": "node_root_child_1_child_2_child_0_child_0_child_1_child_0",
                              "label": "Assess for curative resection",
                              "type": "condition",
                              "search_term": "Assess",
                              "children": []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_2_child_0_child_1",
                      "label": "Presence of high-risk biopsy features (poor differentiation or LVI)",
                      "type": "condition",
                      "search_term": null,
                      "children": [
                        {
                          "id": "node_root_child_1_child_2_child_0_child_1_child_0",
                          "label": "Treatment",
                          "type": "treatment",
                          "search_term": "Treatment",
                          "children": [
                            {
                              "id": "node_root_child_1_child_2_child_0_child_1_child_0_child_0",
                              "label": "Consider ER if technically feasible to accurately stage",
                              "type": "condition",
                              "search_term": "Consider ER",
                              "children": []
                            }
                          ]
                        },
                        {
                          "id": "node_root_child_1_child_2_child_0_child_1_child_1",
                          "label": "Next step",
                          "type": "condition",
                          "search_term": "Next",
                          "children": [
                            {
                              "id": "node_root_child_1_child_2_child_0_child_1_child_1_child_0",
                              "label": "Assess for curative resection",
                              "type": "condition",
                              "search_term": "Assess",
                              "children": []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Esophageal_7": {
    "root": {
      "id": "node_root",
      "label": "root",
      "type": "condition",
      "search_term": null,
      "children": []
    }
  },
  "Gastric_9": {
    "root": {
      "id": "node_root",
      "label": "Peritoneal only metastatic disease (including positive cytology)",
      "type": "condition",
      "search_term": "Peritoneal",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Workup (if not done previously)",
          "type": "condition",
          "search_term": "Workup",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "H&P",
              "type": "condition",
              "search_term": "H&P",
              "children": []
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "Staging with CT chest/abdomen/pelvis with oral and IV contrast",
              "type": "condition",
              "search_term": "Staging CT IV",
              "children": []
            },
            {
              "id": "node_root_child_0_child_2",
              "label": "Consider diagnostic laparoscopy",
              "type": "condition",
              "search_term": "Consider",
              "children": []
            },
            {
              "id": "node_root_child_0_child_3",
              "label": "FDG-PET/CT as clinically indicated",
              "type": "condition",
              "search_term": "FDG-PET/CT",
              "children": []
            },
            {
              "id": "node_root_child_0_child_4",
              "label": "Pathology review",
              "type": "condition",
              "search_term": "Pathology",
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Treatment",
          "type": "treatment",
          "search_term": "Treatment",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Systemic therapy",
              "type": "condition",
              "search_term": "Systemic",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Regimen",
                  "type": "condition",
                  "search_term": "Regimen",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_0_child_0",
                      "label": "GAST-F 4 of 20",
                      "type": "condition",
                      "search_term": "GAST-F",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "Duration",
                  "type": "condition",
                  "search_term": "Duration",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_1_child_0",
                      "label": "Minimum of 3 months",
                      "type": "condition",
                      "search_term": "Minimum",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_1_child_1",
              "label": "Response Assessment",
              "type": "condition",
              "search_term": "Response Assessment",
              "children": [
                {
                  "id": "node_root_child_1_child_1_child_0",
                  "label": "Restaging with",
                  "type": "condition",
                  "search_term": "Restaging",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_0_child_0",
                      "label": "CT scan",
                      "type": "condition",
                      "search_term": "CT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_0_child_1",
                      "label": "Diagnostic laparoscopy with washings with documented peritoneal cancer index (PCI) biopsy",
                      "type": "condition",
                      "search_term": "Diagnostic",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_0_child_2",
                      "label": "Consider FDG-PET/CT",
                      "type": "condition",
                      "search_term": "Consider FDG-PET/CT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_0_child_3",
                      "label": "Consider EGD",
                      "type": "condition",
                      "search_term": "Consider EGD",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_1_child_1",
                  "label": "Response Categories",
                  "type": "condition",
                  "search_term": "Response Categories",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_1_child_0",
                      "label": "Low PCI (≤10), stable or improved disease, no metastatic progression, no extraperitoneal disease",
                      "type": "condition",
                      "search_term": "Low PCI",
                      "children": [
                        {
                          "id": "node_root_child_1_child_1_child_1_child_0_child_0",
                          "label": "Next step",
                          "type": "condition",
                          "search_term": "Next",
                          "children": [
                            {
                              "id": "node_root_child_1_child_1_child_1_child_0_child_0_child_0",
                              "label": "Multidisciplinary consultation",
                              "type": "condition",
                              "search_term": "Multidisciplinary",
                              "children": [
                                {
                                  "id": "node_root_child_1_child_1_child_1_child_0_child_0_child_0_child_0",
                                  "label": "Complete cytoreduction predicted",
                                  "type": "condition",
                                  "search_term": "Complete",
                                  "children": [
                                    {
                                      "id": "node_root_child_1_child_1_child_1_child_0_child_0_child_0_child_0_child_0",
                                      "label": "Additional Treatment",
                                      "type": "treatment",
                                      "search_term": "Additional Treatment",
                                      "children": [
                                        {
                                          "id": "node_root_child_1_child_1_child_1_child_0_child_0_child_0_child_0_child_0_child_0",
                                          "label": "Clinical trial",
                                          "type": "condition",
                                          "search_term": "Clinical",
                                          "children": []
                                        },
                                        {
                                          "id": "node_root_child_1_child_1_child_1_child_0_child_0_child_0_child_0_child_0_child_1",
                                          "label": "Gastrectomy with cytoreductive surgery, and intraperitoneal chemotherapy (IC)/hyperthermic intraperitoneal chemotherapy (HIPEC)",
                                          "type": "condition",
                                          "search_term": "Gastrectomy chemotherapy chemotherapy",
                                          "children": []
                                        },
                                        {
                                          "id": "node_root_child_1_child_1_child_1_child_0_child_0_child_0_child_0_child_0_child_2",
                                          "label": "Continue systemic therapy",
                                          "type": "condition",
                                          "search_term": "Continue",
                                          "children": []
                                        }
                                      ]
                                    }
                                  ]
                                },
                                {
                                  "id": "node_root_child_1_child_1_child_1_child_0_child_0_child_0_child_1",
                                  "label": "Incomplete cytoreduction predicted",
                                  "type": "condition",
                                  "search_term": "Incomplete",
                                  "children": [
                                    {
                                      "id": "node_root_child_1_child_1_child_1_child_0_child_0_child_0_child_1_child_0",
                                      "label": "Additional Treatment",
                                      "type": "treatment",
                                      "search_term": "Additional Treatment",
                                      "children": [
                                        {
                                          "id": "node_root_child_1_child_1_child_1_child_0_child_0_child_0_child_1_child_0_child_0",
                                          "label": "Clinical trial",
                                          "type": "condition",
                                          "search_term": "Clinical",
                                          "children": []
                                        },
                                        {
                                          "id": "node_root_child_1_child_1_child_1_child_0_child_0_child_0_child_1_child_0_child_1",
                                          "label": "Continue systemic therapy",
                                          "type": "condition",
                                          "search_term": "Continue",
                                          "children": []
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_1_child_1_child_1",
                      "label": "High PCI (>10), progression of disease, extraperitoneal metastases",
                      "type": "condition",
                      "search_term": "High PCI",
                      "children": [
                        {
                          "id": "node_root_child_1_child_1_child_1_child_1_child_0",
                          "label": "Additional Treatment",
                          "type": "treatment",
                          "search_term": "Additional Treatment",
                          "children": [
                            {
                              "id": "node_root_child_1_child_1_child_1_child_1_child_0_child_0",
                              "label": "Systemic therapy",
                              "type": "condition",
                              "search_term": "Systemic",
                              "children": []
                            },
                            {
                              "id": "node_root_child_1_child_1_child_1_child_1_child_0_child_1",
                              "label": "Clinical trial",
                              "type": "condition",
                              "search_term": "Clinical",
                              "children": []
                            },
                            {
                              "id": "node_root_child_1_child_1_child_1_child_1_child_0_child_2",
                              "label": "Best supportive care",
                              "type": "condition",
                              "search_term": "Best",
                              "children": []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Hepatocellular_1": {
    "root": {
      "id": "node_root",
      "label": "Patients at risk for HCC",
      "type": "condition",
      "search_term": null,
      "children": [
        {
          "id": "node_root_child_0",
          "label": "With cirrhosis",
          "type": "condition",
          "search_term": null,
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Child-Turcotte-Pugh (CTP) A or B cirrhosis, any etiology",
              "type": "condition",
              "search_term": "Child-Turcotte-Pugh B",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Hepatitis B",
                  "type": "condition",
                  "search_term": "Hepatitis B",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_1",
                  "label": "Hepatitis C",
                  "type": "condition",
                  "search_term": "Hepatitis C",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_2",
                  "label": "Alcohol-associated cirrhosis",
                  "type": "condition",
                  "search_term": "Alcohol-associated",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_3",
                  "label": "Metabolic dysfunction-associated steatohepatitis",
                  "type": "condition",
                  "search_term": "Metabolic",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_4",
                  "label": "Other etiologies",
                  "type": "condition",
                  "search_term": null,
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "CTP C cirrhosis, transplant candidate",
              "type": "condition",
              "search_term": "CTP C",
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Without cirrhosis",
          "type": "condition",
          "search_term": "Without",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Hepatitis B",
              "type": "condition",
              "search_term": "Hepatitis B",
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_2",
          "label": "Next step",
          "type": "condition",
          "search_term": "Next",
          "children": [
            {
              "id": "node_root_child_2_child_0",
              "label": "Ultrasound (US) + Alpha fetoprotein (AFP)",
              "type": "condition",
              "search_term": "Ultrasound Alpha",
              "children": [
                {
                  "id": "node_root_child_2_child_0_child_0",
                  "label": "AFP positive or US nodule(s) ≥10 mm",
                  "type": "condition",
                  "search_term": "AFP US",
                  "children": [
                    {
                      "id": "node_root_child_2_child_0_child_0_child_0",
                      "label": "Next step",
                      "type": "condition",
                      "search_term": "Next",
                      "children": [
                        {
                          "id": "node_root_child_2_child_0_child_0_child_0_child_0",
                          "label": "Additional workup",
                          "type": "condition",
                          "search_term": "Additional",
                          "children": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_2_child_0_child_1",
                  "label": "US nodule(s) <10 mm",
                  "type": "condition",
                  "search_term": "US",
                  "children": [
                    {
                      "id": "node_root_child_2_child_0_child_1_child_0",
                      "label": "Next step",
                      "type": "condition",
                      "search_term": "Next",
                      "children": [
                        {
                          "id": "node_root_child_2_child_0_child_1_child_0_child_0",
                          "label": "Repeat US + AFP in 3–6 months",
                          "type": "condition",
                          "search_term": "Repeat US AFP",
                          "children": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_2_child_0_child_2",
                  "label": "US negative",
                  "type": "condition",
                  "search_term": "US",
                  "children": [
                    {
                      "id": "node_root_child_2_child_0_child_2_child_0",
                      "label": "Next step",
                      "type": "condition",
                      "search_term": "Next",
                      "children": [
                        {
                          "id": "node_root_child_2_child_0_child_2_child_0_child_0",
                          "label": "Repeat US + AFP in 6 months",
                          "type": "condition",
                          "search_term": "Repeat US AFP",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "NSCLC_2": {
    "root": {
      "id": "node_root",
      "label": "Incidental finding: solid nodule(s) on chest CT",
      "type": "condition",
      "search_term": "Incidental CT",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Low risk",
          "type": "condition",
          "search_term": null,
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "<6 mm",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "No routine follow-up",
                  "type": "condition",
                  "search_term": null,
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "6-8 mm",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "CT at 6-12 mo",
                  "type": "condition",
                  "search_term": "CT",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_0_child_0",
                      "label": "Stable",
                      "type": "condition",
                      "search_term": "Stable",
                      "children": [
                        {
                          "id": "node_root_child_0_child_1_child_0_child_0_child_0",
                          "label": "Consider CT at 18-24 mo",
                          "type": "condition",
                          "search_term": "Consider CT",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_0_child_2",
              "label": ">8 mm",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_0_child_2_child_0",
                  "label": "Consider CT at 3 mo",
                  "type": "condition",
                  "search_term": "Consider CT",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_2_child_1",
                  "label": "FDG-PET/CT, or biopsy",
                  "type": "condition",
                  "search_term": "FDG-PET/CT,",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "High risk",
          "type": "condition",
          "search_term": null,
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "<6 mm",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "CT at 12 mo (optional)",
                  "type": "condition",
                  "search_term": "CT",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_0_child_0",
                      "label": "Stable",
                      "type": "condition",
                      "search_term": "Stable",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_0_child_0_child_0",
                          "label": "No routine follow-up",
                          "type": "condition",
                          "search_term": null,
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_1_child_1",
              "label": "6-8 mm",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_1_child_1_child_0",
                  "label": "CT at 6-12 mo",
                  "type": "condition",
                  "search_term": "CT",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_0_child_0",
                      "label": "Stable",
                      "type": "condition",
                      "search_term": "Stable",
                      "children": [
                        {
                          "id": "node_root_child_1_child_1_child_0_child_0_child_0",
                          "label": "Repeat CT at 18-24 mo",
                          "type": "condition",
                          "search_term": "Repeat CT",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_1_child_2",
              "label": ">8 mm",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_1_child_2_child_0",
                  "label": "Consider CT at 3 mo",
                  "type": "condition",
                  "search_term": "Consider CT",
                  "children": []
                },
                {
                  "id": "node_root_child_1_child_2_child_1",
                  "label": "FDG-PET/CT, or biopsy",
                  "type": "condition",
                  "search_term": "FDG-PET/CT,",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "NSCLC_3": {
    "root": {
      "id": "node_root",
      "label": "Incidental finding: subsolid nodule(s) on chest CT",
      "type": "condition",
      "search_term": "Incidental CT",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Solitary pure ground-glass nodules",
          "type": "condition",
          "search_term": "Solitary",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "<6 mm",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Follow-up",
                  "type": "condition",
                  "search_term": "Follow-up",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_0_child_0",
                      "label": "No routine follow-up",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "6 mm",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "Follow-up",
                  "type": "condition",
                  "search_term": "Follow-up",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_0_child_0",
                      "label": "CT at 6Ð12 mo to confirm no growth or development of a solid component",
                      "type": "condition",
                      "search_term": "CT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_1_child_0_child_1",
                      "label": "Then CT every 2 y until 5 y",
                      "type": "condition",
                      "search_term": "Then CT",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Solitary part-solid nodules",
          "type": "condition",
          "search_term": "Solitary",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "<6 mm",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Follow-up",
                  "type": "condition",
                  "search_term": "Follow-up",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_0_child_0",
                      "label": "No routine follow-up",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_1_child_1",
              "label": "6 mm",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_1_child_1_child_0",
                  "label": "Follow-up",
                  "type": "condition",
                  "search_term": "Follow-up",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_0_child_0",
                      "label": "CT at 3Ð6 mo to confirm no growth or change in solid component",
                      "type": "condition",
                      "search_term": "CT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_0_child_1",
                      "label": "Then annual CT for 5 y",
                      "type": "condition",
                      "search_term": "Then CT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_0_child_2",
                      "label": "If solid component 6 mm, consider FDG-PET/CT or biopsy",
                      "type": "condition",
                      "search_term": "FDG-PET/CT",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_2",
          "label": "Multiple subsolid nodules",
          "type": "condition",
          "search_term": "Multiple",
          "children": [
            {
              "id": "node_root_child_2_child_0",
              "label": "<6 mm",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_2_child_0_child_0",
                  "label": "Follow-up",
                  "type": "condition",
                  "search_term": "Follow-up",
                  "children": [
                    {
                      "id": "node_root_child_2_child_0_child_0_child_0",
                      "label": "CT at 3Ð6 mo",
                      "type": "condition",
                      "search_term": "CT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_0_child_0_child_1",
                      "label": "If stable, consider CT at 2 and 4 y",
                      "type": "condition",
                      "search_term": "CT",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_2_child_1",
              "label": "6 mm",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_2_child_1_child_0",
                  "label": "Follow-up",
                  "type": "condition",
                  "search_term": "Follow-up",
                  "children": [
                    {
                      "id": "node_root_child_2_child_1_child_0_child_0",
                      "label": "CT at 3Ð6 mo",
                      "type": "condition",
                      "search_term": "CT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_2_child_1_child_0_child_1",
                      "label": "Subsequent management based on most suspicious nodule(s)",
                      "type": "condition",
                      "search_term": "Subsequent",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Pancreatic_10": {
    "root": {
      "id": "node_root",
      "label": "Disease Progression",
      "type": "condition",
      "search_term": "Disease Progression",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Initial Step",
          "type": "condition",
          "search_term": "Initial Step",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Consider re-biopsy if adequate tissue is not available for molecular profiling",
              "type": "condition",
              "search_term": "Consider",
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Performance Status",
          "type": "condition",
          "search_term": "Performance Status",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Good or intermediate PS",
              "type": "condition",
              "search_term": "Good PS",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Subsequent Therapy",
                  "type": "condition",
                  "search_term": "Subsequent Therapy",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_0_child_0",
                      "label": "Clinical trial (preferred)",
                      "type": "condition",
                      "search_term": "Clinical",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_0_child_0_child_1",
                      "label": "Systemic therapy†, which may include targeted therapy or immunotherapy based on molecular profiling, as clinically indicated",
                      "type": "condition",
                      "search_term": "Systemic immunotherapy",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_0_child_0_child_2",
                      "label": "RT for severe pain refractory to analgesic therapy",
                      "type": "condition",
                      "search_term": "RT",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "Next Step",
                  "type": "condition",
                  "search_term": "Next Step",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_1_child_0",
                      "label": "Palliative and best supportive care",
                      "type": "condition",
                      "search_term": "Palliative",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_0_child_1_child_1",
                      "label": "Clinical trial",
                      "type": "condition",
                      "search_term": "Clinical",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_1_child_1",
              "label": "Poor PS",
              "type": "condition",
              "search_term": "Poor PS",
              "children": [
                {
                  "id": "node_root_child_1_child_1_child_0",
                  "label": "Subsequent Therapy",
                  "type": "condition",
                  "search_term": "Subsequent Therapy",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_0_child_0",
                      "label": "Palliative and best supportive care",
                      "type": "condition",
                      "search_term": "Palliative",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_0_child_1",
                      "label": "Consider single-agent chemotherapy†",
                      "type": "condition",
                      "search_term": "Consider",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_0_child_2",
                      "label": "Targeted therapy† based on molecular profiling, as clinically indicated",
                      "type": "condition",
                      "search_term": "Targeted",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_0_child_3",
                      "label": "Palliative RT",
                      "type": "condition",
                      "search_term": "Palliative RT",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Pancreatic_11": {
    "root": {
      "id": "node_root",
      "label": "Metastatic Disease Following Surgery",
      "type": "condition",
      "search_term": "Metastatic Disease Following Surgery",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Metastatic disease with or without local recurrence",
          "type": "condition",
          "search_term": "Metastatic",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "≥6 mo from completion of primary therapy",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Recurrence Therapy",
                  "type": "condition",
                  "search_term": "Recurrence Therapy",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_0_child_0",
                      "label": "Clinical trial (preferred)",
                      "type": "condition",
                      "search_term": "Clinical",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_1",
                      "label": "Repeat systemic therapy previously administered†",
                      "type": "condition",
                      "search_term": "Repeat",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_2",
                      "label": "Alternate systemic therapy (not previously used)†",
                      "type": "condition",
                      "search_term": "Alternate",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_3",
                      "label": "Palliative and best supportive care",
                      "type": "condition",
                      "search_term": "Palliative",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "<6 mo from completion of primary therapy",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "Recurrence Therapy",
                  "type": "condition",
                  "search_term": "Recurrence Therapy",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_0_child_0",
                      "label": "Clinical trial (preferred)",
                      "type": "condition",
                      "search_term": "Clinical",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_1_child_0_child_1",
                      "label": "Switch to gemcitabine-based systemic chemotherapy† (if fluoropyrimidine-based therapy previously used)",
                      "type": "condition",
                      "search_term": "Switch",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_1_child_0_child_2",
                      "label": "Switch to fluoropyrimidine-based systemic chemotherapy† (if gemcitabine-based therapy previously used)",
                      "type": "condition",
                      "search_term": "Switch",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_1_child_0_child_3",
                      "label": "Alternate systemic therapy (not previously used)†",
                      "type": "condition",
                      "search_term": "Alternate",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_1_child_0_child_4",
                      "label": "Palliative and best supportive care",
                      "type": "condition",
                      "search_term": "Palliative",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Pancreatic_5": {
    "root": {
      "id": "node_root",
      "label": "Locally Advanced Disease",
      "type": "condition",
      "search_term": "Locally Advanced Disease",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "First-Line Therapy",
          "type": "condition",
          "search_term": "First-Line Therapy",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Good or intermediate performance status (PS)",
              "type": "condition",
              "search_term": "Good",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Options",
                  "type": "condition",
                  "search_term": "Options",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_0_child_0",
                      "label": "Clinical trial (preferred)",
                      "type": "condition",
                      "search_term": "Clinical",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_1",
                      "label": "Systemic therapy†",
                      "type": "condition",
                      "search_term": "Systemic",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_2",
                      "label": "Induction chemotherapy† (preferably 4–6 mo) followed by chemoradiation†,,, or stereotactic body RT (SBRT) in selected patients (locally advanced without systemic metastases)",
                      "type": "condition",
                      "search_term": "Induction RT",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_3",
                      "label": "Chemoradiation†, or SBRT in patients who are not candidates for induction chemotherapy",
                      "type": "condition",
                      "search_term": "Chemoradiation†, SBRT chemotherapy",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "Poor PS",
              "type": "condition",
              "search_term": "Poor PS",
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "Options",
                  "type": "condition",
                  "search_term": "Options",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_0_child_0",
                      "label": "Palliative and best supportive care",
                      "type": "condition",
                      "search_term": "Palliative",
                      "children": []
                    },
                    {
                      "id": "node_root_child_0_child_1_child_0_child_1",
                      "label": "Consider single-agent chemotherapy† or palliative RT",
                      "type": "condition",
                      "search_term": "Consider RT",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Subsequent Therapy",
          "type": "condition",
          "search_term": "Subsequent Therapy",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "If no disease progression",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Performance status: Good or intermediate PS",
                  "type": "condition",
                  "search_term": "Performance Good PS",
                  "children": [
                    {
                      "id": "node_root_child_1_child_0_child_0_child_0",
                      "label": "Options",
                      "type": "condition",
                      "search_term": "Options",
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_0_child_0_child_0",
                          "label": "Consider resection if feasible",
                          "type": "condition",
                          "search_term": "Consider",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_0_child_0_child_0_child_1",
                          "label": "Continue systemic therapy†",
                          "type": "condition",
                          "search_term": "Continue",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_0_child_0_child_0_child_2",
                          "label": "Observe",
                          "type": "condition",
                          "search_term": "Observe",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_0_child_0_child_0_child_3",
                          "label": "Clinical trial",
                          "type": "condition",
                          "search_term": "Clinical",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_0_child_0_child_1",
                      "label": "If resection performed",
                      "type": "condition",
                      "search_term": null,
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_0_child_1_child_0",
                          "label": "Adjuvant therapy, if clinically indicated†",
                          "type": "condition",
                          "search_term": "Adjuvant",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_0_child_0_child_2",
                      "label": "If observed",
                      "type": "condition",
                      "search_term": null,
                      "children": [
                        {
                          "id": "node_root_child_1_child_0_child_0_child_2_child_0",
                          "label": "Continued surveillance",
                          "type": "condition",
                          "search_term": "Continued",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_1_child_1",
              "label": "If disease progression",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_1_child_1_child_0",
                  "label": "Performance status: Good PS",
                  "type": "condition",
                  "search_term": "Performance Good PS",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_0_child_0",
                      "label": "Options",
                      "type": "condition",
                      "search_term": "Options",
                      "children": [
                        {
                          "id": "node_root_child_1_child_1_child_0_child_0_child_0",
                          "label": "Clinical trial (preferred)",
                          "type": "condition",
                          "search_term": "Clinical",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_1_child_0_child_0_child_1",
                          "label": "Systemic therapy†",
                          "type": "condition",
                          "search_term": "Systemic",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_1_child_0_child_0_child_2",
                          "label": "Chemoradiation†, or SBRT if not previously given and if primary site is the sole site of progression",
                          "type": "condition",
                          "search_term": "Chemoradiation†, SBRT",
                          "children": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_1_child_1",
                  "label": "Performance status: Declining PS",
                  "type": "condition",
                  "search_term": "Performance Declining PS",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_1_child_0",
                      "label": "Therapy",
                      "type": "condition",
                      "search_term": "Therapy",
                      "children": [
                        {
                          "id": "node_root_child_1_child_1_child_1_child_0_child_0",
                          "label": "Palliative and best supportive care",
                          "type": "condition",
                          "search_term": "Palliative",
                          "children": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_1_child_2",
                  "label": "Performance status: Poor PS and disease progression",
                  "type": "condition",
                  "search_term": "Performance Poor PS",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_2_child_0",
                      "label": "Options",
                      "type": "condition",
                      "search_term": "Options",
                      "children": [
                        {
                          "id": "node_root_child_1_child_1_child_2_child_0_child_0",
                          "label": "Palliative and best supportive care",
                          "type": "condition",
                          "search_term": "Palliative",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_1_child_2_child_0_child_1",
                          "label": "Consider single-agent chemotherapy† or possibly targeted therapy† based on molecular profiling, as clinically indicated",
                          "type": "condition",
                          "search_term": "Consider",
                          "children": []
                        },
                        {
                          "id": "node_root_child_1_child_1_child_2_child_0_child_2",
                          "label": "Palliative RT",
                          "type": "condition",
                          "search_term": "Palliative RT",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Prostate_14": {
    "root": {
      "id": "node_root",
      "label": "Workup and Treatment of M0 Castration-Resistant Prostate Cancer (CRPC)",
      "type": "treatment",
      "search_term": "Workup Treatment M0 Castration-Resistant Prostate Cancer",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Initial Condition",
          "type": "condition",
          "search_term": "Initial Condition",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "CRPC, imaging studies negative for distant metastases",
              "type": "condition",
              "search_term": "CRPC,",
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Primary Management",
          "type": "condition",
          "search_term": "Primary Management",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Continue ADT",
              "type": "condition",
              "search_term": "Continue ADT",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Maintain castrate serum levels of testosterone (<50 ng/dL)",
                  "type": "condition",
                  "search_term": "Maintain",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_1_child_1",
              "label": "PSADT >10 mo",
              "type": "condition",
              "search_term": "PSADT",
              "children": [
                {
                  "id": "node_root_child_1_child_1_child_0",
                  "label": "Therapy Options",
                  "type": "condition",
                  "search_term": "Therapy Options",
                  "children": [
                    {
                      "id": "node_root_child_1_child_1_child_0_child_0",
                      "label": "Monitoring (preferred)",
                      "type": "condition",
                      "search_term": "Monitoring",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_1_child_0_child_1",
                      "label": "Other secondary hormone therapy",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "id": "node_root_child_1_child_2",
              "label": "PSADT ≤10 mo",
              "type": "condition",
              "search_term": "PSADT",
              "children": [
                {
                  "id": "node_root_child_1_child_2_child_0",
                  "label": "Preferred Regimens",
                  "type": "condition",
                  "search_term": "Preferred Regimens",
                  "children": [
                    {
                      "id": "node_root_child_1_child_2_child_0_child_0",
                      "label": "Apalutamide (category 1)",
                      "type": "condition",
                      "search_term": "Apalutamide",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_2_child_0_child_1",
                      "label": "Darolutamide (category 1)",
                      "type": "condition",
                      "search_term": "Darolutamide",
                      "children": []
                    },
                    {
                      "id": "node_root_child_1_child_2_child_0_child_2",
                      "label": "Enzalutamide (category 1)",
                      "type": "condition",
                      "search_term": "Enzalutamide",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_2_child_1",
                  "label": "Other Recommended Regimens",
                  "type": "condition",
                  "search_term": "Recommended Regimens",
                  "children": [
                    {
                      "id": "node_root_child_1_child_2_child_1_child_0",
                      "label": "Other secondary hormone therapy",
                      "type": "condition",
                      "search_term": null,
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_2_child_2",
                  "label": "Follow-up",
                  "type": "condition",
                  "search_term": "Follow-up",
                  "children": [
                    {
                      "id": "node_root_child_1_child_2_child_2_child_0",
                      "label": "Consider periodic disease assessment (PSA and imaging)",
                      "type": "condition",
                      "search_term": "Consider",
                      "children": []
                    }
                  ]
                },
                {
                  "id": "node_root_child_1_child_2_child_3",
                  "label": "Results",
                  "type": "condition",
                  "search_term": "Results",
                  "children": [
                    {
                      "id": "node_root_child_1_child_2_child_3_child_0",
                      "label": "Stable PSA and no evidence of metastases",
                      "type": "condition",
                      "search_term": "Stable PSA",
                      "children": [
                        {
                          "id": "node_root_child_1_child_2_child_3_child_0_child_0",
                          "label": "Action",
                          "type": "condition",
                          "search_term": "Action",
                          "children": [
                            {
                              "id": "node_root_child_1_child_2_child_3_child_0_child_0_child_0",
                              "label": "Maintain current treatment and consider periodic disease assessment (PSA and imaging)",
                              "type": "condition",
                              "search_term": "Maintain",
                              "children": []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_1_child_2_child_3_child_1",
                      "label": "PSA increasing or radiographic evidence of metastases",
                      "type": "condition",
                      "search_term": "PSA",
                      "children": [
                        {
                          "id": "node_root_child_1_child_2_child_3_child_1_child_0",
                          "label": "Action",
                          "type": "condition",
                          "search_term": "Action",
                          "children": [
                            {
                              "id": "node_root_child_1_child_2_child_3_child_1_child_0_child_0",
                              "label": "Imaging",
                              "type": "condition",
                              "search_term": "Imaging",
                              "children": []
                            }
                          ]
                        },
                        {
                          "id": "node_root_child_1_child_2_child_3_child_1_child_1",
                          "label": "Result",
                          "type": "condition",
                          "search_term": "Result",
                          "children": [
                            {
                              "id": "node_root_child_1_child_2_child_3_child_1_child_1_child_0",
                              "label": "No metastases (M0)",
                              "type": "condition",
                              "search_term": null,
                              "children": [
                                {
                                  "id": "node_root_child_1_child_2_child_3_child_1_child_1_child_0_child_0",
                                  "label": "Change or maintain current treatment and continue periodic disease assessment",
                                  "type": "condition",
                                  "search_term": "Change",
                                  "children": []
                                }
                              ]
                            },
                            {
                              "id": "node_root_child_1_child_2_child_3_child_1_child_1_child_1",
                              "label": "Metastases (M1)",
                              "type": "condition",
                              "search_term": "Metastases",
                              "children": [
                                {
                                  "id": "node_root_child_1_child_2_child_3_child_1_child_1_child_1_child_0",
                                  "label": "See Workup and Treatment of M1 CRPC",
                                  "type": "condition",
                                  "search_term": "See Workup Treatment M1 CRPC",
                                  "children": []
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "SCLC_7": {
    "root": {
      "id": "node_root",
      "label": "Progressive Disease",
      "type": "condition",
      "search_term": "Progressive Disease",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Relapse or primary progressive disease",
          "type": "condition",
          "search_term": "Relapse",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Performance Status (PS)",
              "type": "condition",
              "search_term": "Performance Status",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "PS 0–2",
                  "type": "condition",
                  "search_term": "PS",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_0_child_0",
                      "label": "Initial Treatment Options",
                      "type": "treatment",
                      "search_term": "Initial Treatment Options",
                      "children": [
                        {
                          "id": "node_root_child_0_child_0_child_0_child_0_child_0",
                          "label": "Subsequent systemic therapy",
                          "type": "condition",
                          "search_term": "Subsequent",
                          "children": []
                        },
                        {
                          "id": "node_root_child_0_child_0_child_0_child_0_child_1",
                          "label": "Palliative symptom management, including localized RT to symptomatic sites",
                          "type": "condition",
                          "search_term": "Palliative RT",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_0_child_0_child_0_child_1",
                      "label": "Response Evaluation",
                      "type": "condition",
                      "search_term": "Response Evaluation",
                      "children": [
                        {
                          "id": "node_root_child_0_child_0_child_0_child_1_child_0",
                          "label": "Response",
                          "type": "condition",
                          "search_term": "Response",
                          "children": [
                            {
                              "id": "node_root_child_0_child_0_child_0_child_1_child_0_child_0",
                              "label": "Action",
                              "type": "condition",
                              "search_term": "Action",
                              "children": [
                                {
                                  "id": "node_root_child_0_child_0_child_0_child_1_child_0_child_0_child_0",
                                  "label": "Continue until progression or development of unacceptable toxicity",
                                  "type": "condition",
                                  "search_term": "Continue",
                                  "children": []
                                }
                              ]
                            },
                            {
                              "id": "node_root_child_0_child_0_child_0_child_1_child_0_child_1",
                              "label": "Re-evaluation",
                              "type": "condition",
                              "search_term": "Re-evaluation",
                              "children": [
                                {
                                  "id": "node_root_child_0_child_0_child_0_child_1_child_0_child_1_child_0",
                                  "label": "PS 0–2",
                                  "type": "condition",
                                  "search_term": "PS",
                                  "children": [
                                    {
                                      "id": "node_root_child_0_child_0_child_0_child_1_child_0_child_1_child_0_child_0",
                                      "label": "Consider subsequent systemic therapy",
                                      "type": "condition",
                                      "search_term": "Consider",
                                      "children": []
                                    },
                                    {
                                      "id": "node_root_child_0_child_0_child_0_child_1_child_0_child_1_child_0_child_1",
                                      "label": "Palliative symptom management, including localized RT to symptomatic sites",
                                      "type": "condition",
                                      "search_term": "Palliative RT",
                                      "children": []
                                    }
                                  ]
                                },
                                {
                                  "id": "node_root_child_0_child_0_child_0_child_1_child_0_child_1_child_1",
                                  "label": "PS 3–4",
                                  "type": "condition",
                                  "search_term": "PS",
                                  "children": [
                                    {
                                      "id": "node_root_child_0_child_0_child_0_child_1_child_0_child_1_child_1_child_0",
                                      "label": "Palliative symptom management, including localized RT to symptomatic sites",
                                      "type": "condition",
                                      "search_term": "Palliative RT",
                                      "children": []
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "id": "node_root_child_0_child_0_child_0_child_1_child_1",
                          "label": "No response or unacceptable toxicity",
                          "type": "condition",
                          "search_term": null,
                          "children": [
                            {
                              "id": "node_root_child_0_child_0_child_0_child_1_child_1_child_0",
                              "label": "PS 0–2",
                              "type": "condition",
                              "search_term": "PS",
                              "children": [
                                {
                                  "id": "node_root_child_0_child_0_child_0_child_1_child_1_child_0_child_0",
                                  "label": "Consider subsequent systemic therapy",
                                  "type": "condition",
                                  "search_term": "Consider",
                                  "children": []
                                },
                                {
                                  "id": "node_root_child_0_child_0_child_0_child_1_child_1_child_0_child_1",
                                  "label": "Palliative symptom management, including localized RT to symptomatic sites",
                                  "type": "condition",
                                  "search_term": "Palliative RT",
                                  "children": []
                                }
                              ]
                            },
                            {
                              "id": "node_root_child_0_child_0_child_0_child_1_child_1_child_1",
                              "label": "PS 3–4",
                              "type": "condition",
                              "search_term": "PS",
                              "children": [
                                {
                                  "id": "node_root_child_0_child_0_child_0_child_1_child_1_child_1_child_0",
                                  "label": "Palliative symptom management, including localized RT to symptomatic sites",
                                  "type": "condition",
                                  "search_term": "Palliative RT",
                                  "children": []
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_0_child_1",
                  "label": "PS 3–4",
                  "type": "condition",
                  "search_term": "PS",
                  "children": [
                    {
                      "id": "node_root_child_0_child_0_child_1_child_0",
                      "label": "Therapy",
                      "type": "condition",
                      "search_term": "Therapy",
                      "children": [
                        {
                          "id": "node_root_child_0_child_0_child_1_child_0_child_0",
                          "label": "Palliative symptom management, including localized RT to symptomatic sites",
                          "type": "condition",
                          "search_term": "Palliative RT",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Thyroid_10": {
    "root": {
      "id": "node_root",
      "label": "Treatment",
      "type": "treatment",
      "search_term": "Treatment",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Total thyroidectomy with RAI",
          "type": "condition",
          "search_term": "Total RAI",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Disease Monitoring",
              "type": "condition",
              "search_term": "Disease Monitoring",
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "Physical examination",
                  "type": "condition",
                  "search_term": "Physical",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_1",
                  "label": "Neck ultrasound at 6–12 months",
                  "type": "condition",
                  "search_term": "Neck",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_2",
                  "label": "TSH",
                  "type": "condition",
                  "search_term": "TSH",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_3",
                  "label": "Tg measurement and Tg ab",
                  "type": "condition",
                  "search_term": "Tg Tg",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "Findings",
              "type": "condition",
              "search_term": "Findings",
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "Rising or new Tg",
                  "type": "condition",
                  "search_term": "Rising Tg",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_0_child_0",
                      "label": "Management",
                      "type": "condition",
                      "search_term": "Management",
                      "children": [
                        {
                          "id": "node_root_child_0_child_1_child_0_child_0_child_0",
                          "label": "Consider additional imaging (CT neck/chest), PET, or RAI imaging",
                          "type": "condition",
                          "search_term": "Consider PET, RAI",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_0_child_1_child_0_child_1",
                      "label": "Next Step",
                      "type": "condition",
                      "search_term": "Next Step",
                      "children": [
                        {
                          "id": "node_root_child_0_child_1_child_0_child_1_child_0",
                          "label": "Recurrent Disease",
                          "type": "condition",
                          "search_term": "Recurrent Disease",
                          "children": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_1_child_1",
                  "label": "Abnormal imaging and/or rising Tg",
                  "type": "condition",
                  "search_term": "Abnormal Tg",
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_1_child_0",
                      "label": "Management",
                      "type": "condition",
                      "search_term": "Management",
                      "children": [
                        {
                          "id": "node_root_child_0_child_1_child_1_child_0_child_0",
                          "label": "Consider biopsy of suspicious areas on imaging with Tg washout",
                          "type": "condition",
                          "search_term": "Consider Tg",
                          "children": []
                        },
                        {
                          "id": "node_root_child_0_child_1_child_1_child_0_child_1",
                          "label": "Follow-up imaging of known iodine-avid disease with cross-sectional imaging (CT or MRI)",
                          "type": "condition",
                          "search_term": "Follow-up MRI)",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_0_child_1_child_1_child_1",
                      "label": "Next Step",
                      "type": "condition",
                      "search_term": "Next Step",
                      "children": [
                        {
                          "id": "node_root_child_0_child_1_child_1_child_1_child_0",
                          "label": "Recurrent Disease",
                          "type": "condition",
                          "search_term": "Recurrent Disease",
                          "children": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "node_root_child_0_child_1_child_2",
                  "label": "No evidence of disease",
                  "type": "condition",
                  "search_term": null,
                  "children": [
                    {
                      "id": "node_root_child_0_child_1_child_2_child_0",
                      "label": "Management",
                      "type": "condition",
                      "search_term": "Management",
                      "children": [
                        {
                          "id": "node_root_child_0_child_1_child_2_child_0_child_0",
                          "label": "Physical examination",
                          "type": "condition",
                          "search_term": "Physical",
                          "children": []
                        },
                        {
                          "id": "node_root_child_0_child_1_child_2_child_0_child_1",
                          "label": "TSH",
                          "type": "condition",
                          "search_term": "TSH",
                          "children": []
                        },
                        {
                          "id": "node_root_child_0_child_1_child_2_child_0_child_2",
                          "label": "Tg measurement and Tg ab annually if stable",
                          "type": "condition",
                          "search_term": "Tg Tg",
                          "children": []
                        },
                        {
                          "id": "node_root_child_0_child_1_child_2_child_0_child_3",
                          "label": "Neck ultrasound annually for 5 years, then less often if imaging and Tg measurement and Tg ab stable",
                          "type": "condition",
                          "search_term": "Neck Tg Tg",
                          "children": []
                        },
                        {
                          "id": "node_root_child_0_child_1_child_2_child_0_child_4",
                          "label": "See NCCN Guidelines for Survivorship",
                          "type": "condition",
                          "search_term": "See NCCN Guidelines Survivorship",
                          "children": []
                        }
                      ]
                    },
                    {
                      "id": "node_root_child_0_child_1_child_2_child_1",
                      "label": "Next Step",
                      "type": "condition",
                      "search_term": "Next Step",
                      "children": [
                        {
                          "id": "node_root_child_0_child_1_child_2_child_1_child_0",
                          "label": "Recurrent Disease",
                          "type": "condition",
                          "search_term": "Recurrent Disease",
                          "children": []
                        },
                        {
                          "id": "node_root_child_0_child_1_child_2_child_1_child_1",
                          "label": "or Metastatic Disease",
                          "type": "condition",
                          "search_term": "Metastatic Disease",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Thyroid_11": {
    "root": {
      "id": "node_root",
      "label": "Recurrent Disease",
      "type": "condition",
      "search_term": "Recurrent Disease",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Initial Presentation",
          "type": "condition",
          "search_term": "Initial Presentation",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Rising or newly elevated Tg and negative imaging",
              "type": "condition",
              "search_term": "Rising Tg",
              "children": []
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "Non-resectable tumors",
              "type": "condition",
              "search_term": "Non-resectable",
              "children": []
            },
            {
              "id": "node_root_child_0_child_2",
              "label": "Non-radioiodine responsive",
              "type": "condition",
              "search_term": "Non-radioiodine",
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Management",
          "type": "condition",
          "search_term": "Management",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Action",
              "type": "condition",
              "search_term": "Action",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Suppress TSH with levothyroxine",
                  "type": "condition",
                  "search_term": "Suppress TSH",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_1_child_1",
              "label": "Follow-up",
              "type": "condition",
              "search_term": "Follow-up",
              "children": [
                {
                  "id": "node_root_child_1_child_1_child_0",
                  "label": "Continue surveillance with unstimulated Tg, ultrasound, and other imaging as clinically indicated",
                  "type": "condition",
                  "search_term": "Continue Tg,",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Thyroid_2": {
    "root": {
      "id": "node_root",
      "label": "Molecular Diagnostic Results",
      "type": "condition",
      "search_term": "Molecular Diagnostic Results",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Initial Cytology",
          "type": "condition",
          "search_term": "Initial Cytology",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "AUS (Bethesda III) or Follicular neoplasm (Bethesda IV)",
              "type": "condition",
              "search_term": "AUS III) Follicular IV)",
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Molecular diagnostics indicate benign lesion",
          "type": "condition",
          "search_term": "Molecular",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Treatment",
              "type": "treatment",
              "search_term": "Treatment",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Nodule surveillance",
                  "type": "condition",
                  "search_term": "Nodule",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_2",
          "label": "Molecular diagnostics not informative or with insufficient or degraded sample",
          "type": "condition",
          "search_term": "Molecular",
          "children": [
            {
              "id": "node_root_child_2_child_0",
              "label": "Treatment Options",
              "type": "treatment",
              "search_term": "Treatment Options",
              "children": [
                {
                  "id": "node_root_child_2_child_0_child_0",
                  "label": "Nodule surveillance",
                  "type": "condition",
                  "search_term": "Nodule",
                  "children": []
                },
                {
                  "id": "node_root_child_2_child_0_child_1",
                  "label": "Consider lobectomy in select situations for definitive diagnosis/treatment",
                  "type": "condition",
                  "search_term": "Consider",
                  "children": []
                },
                {
                  "id": "node_root_child_2_child_0_child_2",
                  "label": "Consider repeat biopsy",
                  "type": "condition",
                  "search_term": "Consider",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_3",
          "label": "Molecular diagnostics suggestive of malignancy",
          "type": "condition",
          "search_term": "Molecular",
          "children": [
            {
              "id": "node_root_child_3_child_0",
              "label": "Treatment Options",
              "type": "treatment",
              "search_term": "Treatment Options",
              "children": [
                {
                  "id": "node_root_child_3_child_0_child_0",
                  "label": "Consider lobectomy or total thyroidectomy (depending on molecular results) for definitive diagnosis/treatment",
                  "type": "condition",
                  "search_term": "Consider",
                  "children": []
                },
                {
                  "id": "node_root_child_3_child_0_child_1",
                  "label": "Nodule surveillance",
                  "type": "condition",
                  "search_term": "Nodule",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Thyroid_23": {
    "root": {
      "id": "node_root",
      "label": "Structurally persistent/recurrent locoregional or distant metastatic RAI-refractory disease",
      "type": "condition",
      "search_term": "Structurally RAI-refractory",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Initial evaluation",
          "type": "condition",
          "search_term": "Initial",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Somatic testing for actionable mutations",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_0_child_0_child_0",
                  "label": "ALK",
                  "type": "condition",
                  "search_term": "ALK",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_1",
                  "label": "NTRK",
                  "type": "condition",
                  "search_term": "NTRK",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_2",
                  "label": "BRAF",
                  "type": "condition",
                  "search_term": "BRAF",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_3",
                  "label": "RET gene fusions",
                  "type": "condition",
                  "search_term": "RET",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_4",
                  "label": "dMMR",
                  "type": "condition",
                  "search_term": null,
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_5",
                  "label": "MSI",
                  "type": "condition",
                  "search_term": "MSI",
                  "children": []
                },
                {
                  "id": "node_root_child_0_child_0_child_6",
                  "label": "TMB",
                  "type": "condition",
                  "search_term": "TMB",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "Brain imaging (CT or MRI with contrast)",
              "type": "condition",
              "search_term": "Brain MRI",
              "children": [
                {
                  "id": "node_root_child_0_child_1_child_0",
                  "label": "For CNS symptoms or prior to starting systemic therapy",
                  "type": "condition",
                  "search_term": "CNS",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Disease location",
          "type": "condition",
          "search_term": "Disease",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Unresectable locoregional recurrent/persistent disease",
              "type": "condition",
              "search_term": "Unresectable",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "See treatment path below",
                  "type": "condition",
                  "search_term": "See",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_1_child_1",
              "label": "Soft tissue metastases (e.g., lung, liver, muscle) excluding CNS metastases",
              "type": "condition",
              "search_term": "Soft CNS",
              "children": [
                {
                  "id": "node_root_child_1_child_1_child_0",
                  "label": "See treatment path below",
                  "type": "condition",
                  "search_term": "See",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_1_child_2",
              "label": "Bone metastases",
              "type": "condition",
              "search_term": "Bone",
              "children": []
            },
            {
              "id": "node_root_child_1_child_3",
              "label": "CNS metastases",
              "type": "condition",
              "search_term": "CNS",
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_2",
          "label": "Treatment (for unresectable locoregional disease and soft tissue metastases)",
          "type": "treatment",
          "search_term": "Treatment",
          "children": [
            {
              "id": "node_root_child_2_child_0",
              "label": "Options",
              "type": "condition",
              "search_term": "Options",
              "children": [
                {
                  "id": "node_root_child_2_child_0_child_0",
                  "label": "Consider clinical trial",
                  "type": "condition",
                  "search_term": "Consider",
                  "children": []
                },
                {
                  "id": "node_root_child_2_child_0_child_1",
                  "label": "Consider systemic therapy for progressive and/or symptomatic disease (Principles of Systemic Therapy [THYR-B])",
                  "type": "condition",
                  "search_term": "Consider Systemic Therapy",
                  "children": []
                },
                {
                  "id": "node_root_child_2_child_0_child_2",
                  "label": "Continue to suppress TSH with levothyroxine",
                  "type": "condition",
                  "search_term": "Continue TSH",
                  "children": []
                },
                {
                  "id": "node_root_child_2_child_0_child_3",
                  "label": "Consider resection of distant metastases and/or EBRT or other local therapies when available to metastatic lesions if progressive and/or symptomatic (Treatment of Locoregional Recurrence)",
                  "type": "condition",
                  "search_term": "Consider EBRT Locoregional Recurrence)",
                  "children": []
                },
                {
                  "id": "node_root_child_2_child_0_child_4",
                  "label": "Disease monitoring is often appropriate in asymptomatic patients with indolent disease assuming no brain metastasis",
                  "type": "condition",
                  "search_term": "Disease",
                  "children": []
                },
                {
                  "id": "node_root_child_2_child_0_child_5",
                  "label": "Best supportive care (see NCCN Guidelines for Palliative Care)",
                  "type": "condition",
                  "search_term": "Best NCCN Guidelines Palliative Care)",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "Thyroid_4": {
    "root": {
      "id": "node_root",
      "label": "Post-lobectomy",
      "type": "condition",
      "search_term": "Post-lobectomy",
      "children": [
        {
          "id": "node_root_child_0",
          "label": "Initial Assessment",
          "type": "condition",
          "search_term": "Initial Assessment",
          "children": [
            {
              "id": "node_root_child_0_child_0",
              "label": "Thyroid and neck ultrasound (including central and lateral cervical nodal compartments), if not previously done",
              "type": "condition",
              "search_term": "Thyroid",
              "children": []
            },
            {
              "id": "node_root_child_0_child_1",
              "label": "Biopsy suspicious lymph nodes or contralateral lesions that meet sonographic criteria by ATA and TI-RADS",
              "type": "condition",
              "search_term": null,
              "children": []
            }
          ]
        },
        {
          "id": "node_root_child_1",
          "label": "Findings",
          "type": "condition",
          "search_term": "Findings",
          "children": [
            {
              "id": "node_root_child_1_child_0",
              "label": "Any of the following",
              "type": "condition",
              "search_term": "Any",
              "children": [
                {
                  "id": "node_root_child_1_child_0_child_0",
                  "label": "Gross positive resection margins",
                  "type": "condition",
                  "search_term": "Gross",
                  "children": []
                },
                {
                  "id": "node_root_child_1_child_0_child_1",
                  "label": "Gross extra-thyroidal extension",
                  "type": "condition",
                  "search_term": "Gross",
                  "children": []
                },
                {
                  "id": "node_root_child_1_child_0_child_2",
                  "label": "Confirmed nodal metastasish",
                  "type": "condition",
                  "search_term": "Confirmed",
                  "children": []
                },
                {
                  "id": "node_root_child_1_child_0_child_3",
                  "label": "Confirmed contralateral disease",
                  "type": "condition",
                  "search_term": "Confirmed",
                  "children": []
                },
                {
                  "id": "node_root_child_1_child_0_child_4",
                  "label": "Vascular invasion",
                  "type": "condition",
                  "search_term": "Vascular",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_1_child_1",
              "label": "Primary Treatment",
              "type": "treatment",
              "search_term": "Primary Treatment",
              "children": [
                {
                  "id": "node_root_child_1_child_1_child_0",
                  "label": "Completion of thyroidectomy",
                  "type": "condition",
                  "search_term": "Completion",
                  "children": []
                },
                {
                  "id": "node_root_child_1_child_1_child_1",
                  "label": "Perform therapeutic neck dissection of involved compartments for clinically apparent/biopsy-proven disease if not previously done",
                  "type": "condition",
                  "search_term": "Perform",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_1_child_2",
              "label": "Next Step",
              "type": "condition",
              "search_term": "Next Step",
              "children": [
                {
                  "id": "node_root_child_1_child_2_child_0",
                  "label": "Postsurgical Evaluation",
                  "type": "condition",
                  "search_term": "Postsurgical Evaluation",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_2",
          "label": "Findings 2",
          "type": "condition",
          "search_term": "Findings",
          "children": [
            {
              "id": "node_root_child_2_child_0",
              "label": "Any of the following",
              "type": "condition",
              "search_term": "Any",
              "children": [
                {
                  "id": "node_root_child_2_child_0_child_0",
                  "label": "Tumor >4 cm",
                  "type": "condition",
                  "search_term": "Tumor",
                  "children": []
                },
                {
                  "id": "node_root_child_2_child_0_child_1",
                  "label": "Lymphatic invasion",
                  "type": "condition",
                  "search_term": "Lymphatic",
                  "children": []
                },
                {
                  "id": "node_root_child_2_child_0_child_2",
                  "label": "Macroscopic multifocal disease (>1 cm)",
                  "type": "condition",
                  "search_term": "Macroscopic",
                  "children": []
                },
                {
                  "id": "node_root_child_2_child_0_child_3",
                  "label": "Poorly differentiated and differentiated high-grade carcinoma",
                  "type": "condition",
                  "search_term": "Poorly",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_2_child_1",
              "label": "Primary Treatment",
              "type": "treatment",
              "search_term": "Primary Treatment",
              "children": [
                {
                  "id": "node_root_child_2_child_1_child_0",
                  "label": "Completion of thyroidectomy",
                  "type": "condition",
                  "search_term": "Completion",
                  "children": []
                },
                {
                  "id": "node_root_child_2_child_1_child_1",
                  "label": "or Disease monitoring (category 2B)",
                  "type": "condition",
                  "search_term": "Disease",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_2_child_2",
              "label": "Additional Management",
              "type": "condition",
              "search_term": "Additional Management",
              "children": [
                {
                  "id": "node_root_child_2_child_2_child_0",
                  "label": "Consider levothyroxine therapy to keep thyroid stimulating hormone (TSH) low or normalk",
                  "type": "condition",
                  "search_term": "Consider",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": "node_root_child_3",
          "label": "Findings 3",
          "type": "condition",
          "search_term": "Findings",
          "children": [
            {
              "id": "node_root_child_3_child_0",
              "label": "All of the following",
              "type": "condition",
              "search_term": "All",
              "children": [
                {
                  "id": "node_root_child_3_child_0_child_0",
                  "label": "Negative resection margins",
                  "type": "condition",
                  "search_term": "Negative",
                  "children": []
                },
                {
                  "id": "node_root_child_3_child_0_child_1",
                  "label": "No contralateral lesion",
                  "type": "condition",
                  "search_term": null,
                  "children": []
                },
                {
                  "id": "node_root_child_3_child_0_child_2",
                  "label": "No suspicious lymph node",
                  "type": "condition",
                  "search_term": null,
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_3_child_1",
              "label": "or",
              "type": "condition",
              "search_term": null,
              "children": [
                {
                  "id": "node_root_child_3_child_1_child_0",
                  "label": "NIFTP",
                  "type": "condition",
                  "search_term": "NIFTP",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_3_child_2",
              "label": "Primary Treatment",
              "type": "treatment",
              "search_term": "Primary Treatment",
              "children": [
                {
                  "id": "node_root_child_3_child_2_child_0",
                  "label": "Disease monitoring",
                  "type": "condition",
                  "search_term": "Disease",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_3_child_3",
              "label": "Additional Management",
              "type": "condition",
              "search_term": "Additional Management",
              "children": [
                {
                  "id": "node_root_child_3_child_3_child_0",
                  "label": "Consider levothyroxine therapy to keep TSH normalk",
                  "type": "condition",
                  "search_term": "Consider TSH",
                  "children": []
                }
              ]
            },
            {
              "id": "node_root_child_3_child_4",
              "label": "Next Step",
              "type": "condition",
              "search_term": "Next Step",
              "children": [
                {
                  "id": "node_root_child_3_child_4_child_0",
                  "label": "Disease Monitoring and Maintenance",
                  "type": "condition",
                  "search_term": "Disease Monitoring Maintenance",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  }
};

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TREES };
}
