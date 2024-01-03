<html>
    <head>
        <title>Form-1</title>
        <style type="text/css">
            body {
                font-family: serif;
                font-size: 14px;
            }
            table.CompanyDetails, td {
                width: 100%;
                border: 1px solid black;
                border-collapse: collapse;
                word-spacing: 2px;
            }
            table.newTable, td {
                width: 100%;
                border: 1px solid #D3D3D3;
                border-collapse: collapse;
            }
            td.new-column{
                width: 25%;
                text-align: center;
            }
            td.first-column{
                width: 5.1%;
                text-align: center;
            }
            td.common-first-column{
                width: 3.9%;
                text-align: center;
            }
            td.second-column{
                width: 39%;
            }
            td.common-second-column{
                width: 25%;
            }
            td.common-third-column{
                width: 43%;
            }
            td.third-column{
                width: 43%;
            }
            td.table-first-column{
                width: 5.45%;
                text-align: center;
            }
            td.table-second-column{
                width: 25%;
            }
            td.table-third-column{
                width: 25%;
            }
            td.table-forth-column{
                width: 20%;
            }
            td.table-fifth-column{
                width: 25%;
            }
            td.single-second-column{
                width: 94%;
            }
            table.CompanyDetails td{
                height: 60px;
                padding: 3px;
            }
            td.declaration-number{
                border: none;
                width: 5%;
                vertical-align: text-top;
            }
            td.declaration{
                border: none;
                width: 100%;
            }
            td.border-none{
                border: none;
            }
        </style>
    </head>
    <body>
        <div style="font-size: 14px; text-align: center;">COMMON APPLICATION FORM</div>
        <div style="text-align: center;">FOR INVESTMENT PROMOTION SCHEME - 2015 FOR MSME</div>
        <br/>
        <div>1. General Information</div>
        <br/>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name of the Enterprise :</td>
                <td class="third-column">
                    <?php echo $msme_data['enterprise_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2(i) </td>
                <td class="second-column">Office Address with pin code No. :</td>
                <td class="third-column">
                    <?php echo $msme_data['office_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Office Contact No. :</td>
                <td class="third-column">
                    <?php echo $msme_data['office_contactno']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2(ii) </td>
                <td class="second-column">Factory Address with pin code No. :</td>
                <td class="third-column">
                    <?php echo $msme_data['office_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2(iii)(a) </td>
                <td class="second-column">Contact No. :</td>
                <td class="third-column">
                    <?php echo $msme_data['office_contactno']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2(iii)(b) </td>
                <td class="second-column">Fax :</td>
                <td class="third-column">
                    <?php echo $msme_data['fax']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2(iii)(c) </td>
                <td class="second-column">Cell Phone :</td>
                <td class="third-column">
                    <?php echo $msme_data['cellphone']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2(iii)(d) </td>
                <td class="second-column">Email :</td>
                <td class="third-column">
                    <?php echo $msme_data['email']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Constitution of the Enterprise :</td>
                <td class="third-column">
                    <?php
                        if($msme_data['constitution'] == 1)
                            echo 'Partnership';
                        else if($msme_data['constitution'] == 2)
                            echo 'Company';
                        else if($msme_data['constitution'] == 3)
                            echo 'Society';
                        else if($msme_data['constitution'] == 4)
                            echo 'Others';
                    ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Name,Designation & Contact Details of the Promoter :</td>
                <td class="third-column">
                    <?php echo $msme_data['promoters_details']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5</td>
                <td class="second-column">Social Status of the Entrepreneur :</td>
                <td class="third-column">
                    <?php echo $msme_data['is_women_entrepreneur'] == 1 ? 'Women' : ''; ?>

                    <?php if($msme_data['is_women_entrepreneur'] == 1){ ?>
                        <br/><a href ="<?php echo MSME_DOC_PATH; ?><?php echo $msme_data['women_entrepreneur']; ?>" target="_blank"> View Document </a>
                    <?php } ?><br/>

                    <?php echo $msme_data['is_sc_st_entrepreneur'] == 1 ? 'SC/ST' : ''; ?>

                    <?php if($msme_data['is_sc_st_entrepreneur'] == 1){ ?>
                        <br/><a href ="<?php echo MSME_DOC_PATH; ?><?php echo $msme_data['sc_st_entrepreneur']; ?>" target="_blank"> View Document </a>
                    <?php } ?><br/>

                    <?php echo $msme_data['is_physically_entrepreneur'] == 1 ? 'Physically Disabled' : ''; ?>

                    <?php if($msme_data['is_physically_entrepreneur'] == 1){ ?>
                        <br/><a href ="<?php echo MSME_DOC_PATH; ?><?php echo $msme_data['physically_entrepreneur']; ?>" target="_blank"> View Document </a>
                    <?php } ?><br/>

                    <?php echo $msme_data['is_transgender_entrepreneur'] == 1 ? 'Transgender' : ''; ?>

                    <?php if($msme_data['is_transgender_entrepreneur'] == 1){ ?>
                        <br/><a href ="<?php echo MSME_DOC_PATH; ?><?php echo $msme_data['transgender_entrepreneur']; ?>" target="_blank"> View Document </a>
                    <?php } ?><br/>

                    <?php echo $msme_data['is_other_entrepreneur'] == 1 ? 'Others' : ''; ?>

                    <?php if($msme_data['is_other_entrepreneur'] == 1){ ?>
                        <br/><a href ="<?php echo MSME_DOC_PATH; ?><?php echo $msme_data['other_entrepreneur']; ?>" target="_blank"> View Document </a>
                    <?php } ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">6</td>
                <td class="second-column">If Women / SC , ST / Physically Disabled / Transgender, please indicate % share of the Proprietor / Partner(s) / Director(s) in the equity:</td>
                <td class="third-column">
                    <?php 
                        if($msme_data['proprietor_share_details']){ ?>
                            <table class="newTable">
                                <tr>
                                    <th></th>
                                    <td>Name</td>
                                    <td>Sex</td>
                                    <td>Community</td>
                                    <td>P.H.</td>
                                    <td>Share</td>
                                    <td>Value</td>
                                    <td>%</td>
                                </tr>
                                <?php
                                    $proprietorinfo = json_decode($msme_data['proprietor_share_details'], TRUE);
                                    $i=1;
                                    foreach ($proprietorinfo as $value) { ?>
                                        <tr>
                                            <td class="new-column"><?php echo $i++; ?></td>
                                            <td class="new-column"><?php echo $value['name']; ?></td>
                                            <td class="new-column"><?php echo $value['gender'] == 1 ? 'Male' : 'Female'; ?></td>
                                            <td class="new-column"><?php echo $value['community']; ?></td>
                                            <td class="new-column"><?php echo $value['ph']; ?></td>
                                            <td class="new-column"><?php echo $value['share']; ?></td>
                                            <td class="new-column"><?php echo $value['value']; ?></td>
                                            <td class="new-column"><?php echo $value['percent']; ?></td>
                                        </tr>
                                <?php } ?>
                            </table>
                    <?php } ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">7 </td>
                <td class="second-column">Name,Designation & Contact Details of the Authorized Person :</td>
                <td class="third-column">
                    <?php echo $msme_data['othorized_person_detail']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">8 </td>
                <td class="second-column">Type of the Unit :</td>
                <td class="third-column">
                    <?php
                        if($msme_data['unit_type'] == 1)
                            echo 'Micro';
                        else if($msme_data['unit_type'] == 2)
                            echo 'Small';
                        else if($msme_data['unit_type'] == 3)
                            echo 'Medium';
                    ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">9 </td>
                <td class="second-column">Category of the Enterprise :</td>
                <td class="third-column">
                    <?php
                        if($msme_data['category'] == 1)
                            echo 'New';
                        else if($msme_data['category'] == 2)
                            echo 'Expansion';
                    ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Part i E.M. No. :</td>
                <td class="third-column">
                    <?php echo $msme_data['emno_part1']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Part i E.M. Date :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($msme_data['emdate_part1'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"></td>
                <td class="second-column">Part ii E.M. No. :</td>
                <td class="third-column">
                    <?php echo $msme_data['emno_part2']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Part ii E.M. Date :</td>
                <td class="third-column">
                    <?php echo $msme_data['emdate_part2']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">9(i) </td>
                <td class="second-column">Manufacturing items :</td>
                <td class="third-column">
                    <?php echo $msme_data['manufacturing_items']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">9(ii) </td>
                <td class="second-column">Annual production capacity (In MT p.a.) :</td>
                <td class="third-column">
                    <?php echo $msme_data['annual_capacity']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">11 </td>
                <td class="second-column">PCC approval for NOC / Consent :</td>
                <td class="third-column">
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Approval / Consent No. :</td>
                <td class="third-column">
                    <?php echo $msme_data['approval_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Date :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($msme_data['pccno_date'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Valid upto Date :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($msme_data['pccno_validupto_date'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">12 </td>
                <td class="second-column">Details of Factory License / Establishment Registration :</td>
                <td class="third-column">
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Registration No. :</td>
                <td class="third-column">
                    <?php echo $msme_data['factory_registration_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Date :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($msme_data['establishment_date'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Valid upto Date :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($msme_data['establishment_validupto_date'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">13 </td>
                <td class="second-column">Date of commencement of Commercial Production :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($msme_data['commencement_date'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">14 </td>
                <td class="second-column">Annual Turnover (Actual/Estimated) :</td>
                <td class="third-column">
                    <?php echo date("Y",strtotime("-1 year")); ?> : <?php echo $msme_data['annual_turnover']; ?><br/>
                    <?php echo date("Y",strtotime("-2 year")); ?> : <?php echo $msme_data['annual_turnover_one']; ?><br/>
                    <?php echo date("Y",strtotime("-3 year")); ?> : <?php echo $msme_data['annual_turnover_two']; ?><br/>
                    <?php echo date("Y",strtotime("-4 year")); ?> : <?php echo $msme_data['annual_turnover_three']; ?><br/>
                    <?php echo date("Y",strtotime("-5 year")); ?> : <?php echo $msme_data['annual_turnover_four']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">15 </td>
                <td class="second-column">Whether any financial assistance granted by Govt. of india / others ? (if Yes, please attech details) :</td>
                <td class="third-column">
                    <?php echo $msme_data['financial_assistance'] == 1 ? 'YES' : 'NO' ; ?><br/>
                    <?php if($msme_data['financial_assistance'] == 1){ ?>
                        <a href ="<?php echo MSME_DOC_PATH; ?><?php echo $msme_data['financial_assistance_upload']; ?>" target="_blank"> View Document </a>
                    <?php } ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">16 </td>
                <td class="second-column">Whether any Government dues are outstanding OR Court case against Govt. ? (if Yes, please attech details) :</td>
                <td class="third-column">
                    <?php echo $msme_data['govt_dues'] == 1 ? 'YES' : 'NO'; ?><br/>
                    <?php if($msme_data['govt_dues'] == 1){ ?>
                        <a href ="<?php echo MSME_DOC_PATH; ?><?php echo $msme_data['govt_dues_upload']; ?>" target="_blank"> View Document </a>
                    <?php } ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">17 </td>
                <td class="second-column">Bank Details for Assistance :</td>
                <td class="third-column">
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Name of Bank :</td>
                <td class="third-column">
                    <?php echo $msme_data['bank_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Bank Account No :</td>
                <td class="third-column">
                    <?php echo $msme_data['account_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">IFSC Code No. :</td>
                <td class="third-column">
                    <?php echo $msme_data['ifsc_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Branch Code No :</td>
                <td class="third-column">
                    <?php echo $msme_data['bankbranch_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">PAN Card No. of the Unit :</td>
                <td class="third-column">
                    <?php echo $msme_data['pancard_no']; ?>
                </td>
            </tr>
        </table>
        <br/>
        <!-- <div style="font-size: 14px; text-align: center;font-weight: bold;"><u>PART A</u></div><br/> -->
        <div style="font-size: 14px; text-align: center;font-weight: bold;" >2. Name of the Scheme : Capital Investment / Interest Subsidy </div>
        <br/>
         <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name of the Enterprise:</td>
                <td class="third-column">
                    <?php echo $msme_data['enterprise_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Category of the Enterprise :</td>
                <td class="third-column">
                    <?php
                        if($msme_data['enterprise_category'] == 1)
                            echo 'New';
                        else if($msme_data['enterprise_category'] == 2)
                            echo 'Expansion';
                        else if($msme_data['enterprise_category'] == 3)
                            echo 'Diversification';
                        else if($msme_data['enterprise_category'] == 4)
                            echo 'Modernization';
                    ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">For New Project :</td>
                <td class="third-column">
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Investment made in Plant & Machinery  - (In Lacs) (As per Annexure-1):</td>
                <td class="third-column">
                    <?php echo $msme_data['investment']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">For Unit going under Expansion / Diversification / Modernization (in Lakhs) :</td>
                <td class="third-column">
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Investment already made in Plant & Machinery in Existing Unit :</td>
                <td class="third-column">
                    <?php echo $msme_data['machinery_units']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">New Investment in Plant & Machinery (As per Annexure-1) :</td>
                <td class="third-column">
                    <?php echo $msme_data['new_investment']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Increase in Investment (%) :</td>
                <td class="third-column">
                    <?php echo $msme_data['investment_percentage']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5 </td>
                <td class="second-column">Means of Finance (in Lakhs) :</td>
                <td class="third-column">
                    <table class="CompanyDetails" id="" style="margin-top: 10px;">
                        <thead>
                            <tr style='color: #000;'>
                                <td>Promoters Contribution</td>
                                <td>Term Loan</td>
                                <td>Unsecured Loan</td>
                                <td>Internal Accruals / Others</td>
                                <td>Total</td>
                            </tr>
                            <tr style='color: #000;'>
                                <td><?php echo $msme_data['contribution']; ?></td>
                                <td>
                                    <?php echo $msme_data['term_loan']; ?>
                                </td>
                                <td>
                                    <?php echo $msme_data['unsecured_loan']; ?>
                                </td>
                                <td>
                                    <?php echo $msme_data['accruals']; ?>
                                </td>
                                <td>
                                    <?php echo $msme_data['finance_total']; ?>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </td>
            </tr>
            <tr>
                <td class="first-column">6 </td>
                <td class="second-column">Details of Financial Institution  :</td>
                <td class="third-column">
                    <?php 
                        if($msme_data['financial_data_info']){ ?>
                        <table class="newTable" border="1">
                            <tr>
                                <td>Sr No.</td>
                                <td>Name & address</td>
                                <td>IFSC Code No.</td>
                                <td>Branch Code No.</td>
                                <td>Type of Loan</td>
                                <td>Sanction Amount</td>
                                <td>Date</td>
                                <td>Rate of Interest %</td>
                            </tr>
                            <?php
                                $financialinfo = json_decode($msme_data['financial_data_info'], TRUE);
                                $i=1;
                                foreach ($financialinfo as $value) { ?>
                                    <tr>
                                        <td class="new-column"><?php echo $i++; ?></td>
                                        <td class="new-column"><?php echo $value['name_address']; ?></td>
                                        <td class="new-column"><?php echo $value['ifsc_code']; ?></td>
                                        <td class="new-column"><?php echo $value['branch_code']; ?></td>
                                        <td class="new-column"><?php echo $value['loan_type']; ?></td>
                                        <td class="new-column"><?php echo $value['sanction_amount']; ?></td>
                                        <td class="new-column"><?php echo $value['financial_date']; ?></td>
                                        <td class="new-column"><?php echo $value['rate']; ?></td>
                                    </tr>
                            <?php } ?>
                        </table>
                    <?php } ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">7 </td>
                <td class="second-column">Date of First Disbursement of Term Loan :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($msme_data['term_loan_date'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">8 </td>
                <td class="second-column">Term Loan Account No. :</td>
                <td class="third-column">
                    <?php echo $msme_data['loan_accountno']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">9 </td>
                <td class="second-column">Total Amount Claim for Assistance :</td>
                <td class="third-column">
                    <table class="CompanyDetails" id="" style="margin-top: 10px;">
                        <thead>
                            <tr style='color: #000;'>
                                <td>Sr. No.</td>
                                <td>Type of Assistance</td>
                                <td>Amount</td>
                            </tr>
                            <tr style='color: #000;'>
                                <td>1</td>
                                <td>
                                    Capital Investment Subsidy
                                </td>
                                <td>
                                    <?php echo $msme_data['capital_subsidy']; ?>
                                </td>
                            </tr>
                            <tr style='color: #000;'>
                                <td>2</td>
                                <td>
                                    Interest Subsidy @ 5% per annum (max. 30 Lakhs per annum)
                                </td>
                                <td>
                                    <?php echo $msme_data['anum']; ?>
                                </td>
                            </tr>
                            <tr style='color: #000;'>
                                <td></td>
                                <td>
                                    Total
                                </td>
                                <td>
                                    <?php echo $msme_data['cliam_amount_total']; ?>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </td>
            </tr>
            <tr>
                <td class="first-column">10 </td>
                <td class="second-column">I / We OPT for the date of eligibility of interest subsidy from the  :</td>
                <td class="third-column"></td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Date of commencement of commercial production  :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($msme_data['commencement_date'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Date of first Disbursement of Loan  :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($msme_data['disbursement_date'])); ?>
                </td>
            </tr>
        </table>
        <br/>
        <!-- <div style="font-size: 14px; text-align: center;font-weight: bold;"><u>PART B</u></div><br/> -->
        <div style="font-size: 14px; text-align: center;font-weight: bold;" >3. Name of the Scheme : ASSISTANCE FOR QUALITY CERTIFICATION</div>
        <br/>
         <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">For Enterprise Resource Planning ERP System :</td>
                <td class="third-column"></td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Name & Address of ERP System Supplier :</td>
                <td class="third-column">
                    <?php echo $msme_data['supplier_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Features of the ERP System :</td>
                <td class="third-column">
                    <?php echo $msme_data['features']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">For ISO Certification :</td>
                <td class="third-column"></td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Name & Address of Certifing Agency :</td>
                <td class="third-column">
                    <?php echo $msme_data['iso_agency_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Details of Product of which the certificate has been issued :</td>
                <td class="third-column">
                    <?php echo $msme_data['iso_product_detail']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3(i) </td>
                <td class="second-column">Name & Address of Certifing Agency :</td>
                <td class="third-column">
                    <?php echo $msme_data['isi_agency_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3(ii) </td>
                <td class="second-column">Certificate No. :</td>
                <td class="third-column">
                    <?php echo $msme_data['iso_certificate_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Certificate Date :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($msme_data['iso_certificate_date'])); ?>
                </td>
            </tr>
            
            <tr>
                <td class="first-column">3(iii) </td>
                <td class="second-column">Details of Product of which the certificate has been issued :</td>
                <td class="third-column">
                    <?php echo $msme_data['isi_product_detail']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Certificate No. :</td>
                <td class="third-column">
                    <?php echo $msme_data['isi_certificate_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Certificate Date :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($msme_data['isi_certificate_date'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Total Expenditure on Quality Certification (In Lakhs) :</td>
                <td class="third-column">
                    <?php echo $msme_data['expenditure']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5 </td>
                <td class="second-column">Total Amount Claim for Assistance :</td>
                <td class="third-column">
                    <table class="CompanyDetails" id="" style="margin-top: 10px;">
                        <thead>
                            <tr style='color: #000;'>
                                <td>Sr. No.</td>
                                <td>Type of Assistance</td>
                                <td>Amount</td>
                            </tr>
                            <tr style='color: #000;'>
                                <td>1</td>
                                <td>
                                    50% of Capital Cost for installing ERP System (maximum 50,000)
                                </td>
                                <td>
                                    <?php echo $msme_data['capital_cost']; ?>
                                </td>
                            </tr>
                            <tr style='color: #000;'>
                                <td>2</td>
                                <td>
                                    50% of all charges including Consultancy Fees (maximum 50,000)
                                </td>
                                <td>
                                    <?php echo $msme_data['consutancy_fees']; ?>
                                </td>
                            </tr>
                            <tr style='color: #000;'>
                                <td>3</td>
                                <td>
                                    50% of all charges for obtaining each certification (maximum 5 Lakhs)
                                </td>
                                <td>
                                    <?php echo $msme_data['certification_charges']; ?>
                                </td>
                            </tr>
                            <tr style='color: #000;'>
                                <td>4</td>
                                <td>
                                    50% of cost of testing equipments required for certification (maximum 5 Lakhs)
                                </td>
                                <td>
                                    <?php echo $msme_data['testing_equipments']; ?>
                                </td>
                            </tr>
                            <tr style='color: #000;'>
                                <td></td>
                                <td>
                                    Total
                                </td>
                                <td>
                                    <?php echo $msme_data['cliam_amount_total']; ?>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </td>
            </tr>
        </table>
        <br/>
        <div>Any Financial transaction / expenditure statements submitted by the applicant must be signed by the authorized signatory with compant seal & stemp and certified by the company's statutory auditor / chartered accountant</div>
        <br/>
        <!-- <div style="font-size: 14px; text-align: center;font-weight: bold;"><u>PART C</u></div><br/> -->
        <div style="font-size: 14px; text-align: center;font-weight: bold;" >4. Name of the Scheme : ASSISTANCE FOR PATENT REGISTRATION</div>
        <br/>
         <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Patent Registration No. :</td>
                <td class="third-column">
                    <?php echo $msme_data['registration_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Date of Registration :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($msme_data['registration_date'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Name & Address of Office from where patent registration was obtained :</td>
                <td class="third-column">
                    <?php echo $msme_data['patent_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Name of Product / Activity for which Patent registration is obtained :</td>
                <td class="third-column">
                    <?php echo $msme_data['product_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5 </td>
                <td class="second-column">Total Expenditure made on patent registration with details (In Lakhs) (As per Annexure-II):</td>
                <td class="third-column">
                    <?php echo $msme_data['patent_expenditure']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">6 </td>
                <td class="second-column">Total Amount claim for Assistance (In Lakhs) (50% subsidy claim on Patent Registration) :</td>
                <td class="third-column">
                    <?php echo $msme_data['claim_amount']; ?>
                </td>
            </tr>
        </table>
        <br/>
        <div>Any Financial transaction / expenditure statements submitted by the applicant must be signed by the authorized signatory with compant seal & stemp and certified by the company's statutory auditor / chartered accountant</div>
        <br/>
        <!-- <div style="font-size: 14px; text-align: center;font-weight: bold;"><u>PART D</u></div><br/> -->
        <div style="font-size: 14px; text-align: center;font-weight: bold;" >5. Name of the Scheme : ASSISTANCE FOR SAVING IN CONSUMPTION OF ENERGY AND WATER</div>
        <br/>
         <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name and Address of auditing Institution / consultant for Energy / Water :</td>
                <td class="third-column">
                    <?php echo $msme_data['consultant_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Brief of suggestions / recommendation of the Audit Study<br/>Please Submit copy of Audit Report / Relevant part of Audit Report :</td>
                <td class="third-column">
                    <?php echo $msme_data['suggestion']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Upload Document :</td>
                <td class="third-column">
                    <a href ="<?php echo MSME_DOC_PATH; ?><?php echo $msme_data['audit_report']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Result / Benifits after implementation of energy / water saving equipments i.e. decrease in conservation of water / electricity in Nos. / Units / Liters / etc. :</td>
                <td class="third-column">
                    <?php echo $msme_data['result_benefit']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Name of equipments used for Energy / Water conservation and cost for each equipment :</td>
                <td class="third-column">
                    <?php 
                        if($msme_data['equipment_info']){ ?>
                        <table class="newTable" border="1">
                            <tr>
                                <td>Sr No.</td>
                                <td>Name of Equipments</td>
                                <td>Cost</td>
                            </tr>
                            <?php
                                $equipmentinfo = json_decode($msme_data['equipment_info'], TRUE);
                                $i=1;
                                foreach ($equipmentinfo as $value) { ?>
                                    <tr>
                                        <td class="new-column"><?php echo $i++; ?></td>
                                        <td class="new-column"><?php echo $value['equipment_name']; ?></td>
                                        <td class="new-column"><?php echo $value['cost']; ?></td>
                                    </tr>
                            <?php } ?>
                        </table>
                    <?php } ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5 </td>
                <td class="second-column">Total Expenditure made on Energy / water Conservation :</td>
                <td class="third-column">
                    <?php echo $msme_data['total_expenditure']; ?>
                </td>
            </tr>
            
            <tr>
                <td class="first-column">6 </td>
                <td class="second-column">Total Amount Claim for Assistance :</td>
                <td class="third-column">
                    <table class="CompanyDetails" id="" style="margin-top: 10px;">
                        <thead>
                            <tr style='color: #000;'>
                                <td>Sr. No.</td>
                                <td>Type of Assistance</td>
                                <td>Amount</td>
                            </tr>
                            <tr style='color: #000;'>
                                <td>1</td>
                                <td>
                                    75% on cost of Audit Fees (maximum 50,000)
                                </td>
                                <td>
                                    <?php echo $msme_data['audit_fees']; ?>
                                </td>
                            </tr>
                            <tr style='color: #000;'>
                                <td>2</td>
                                <td>
                                    25% on cost of equipments recommendation by Institution (maximum 20 Lakhs)
                                </td>
                                <td>
                                    <?php echo $msme_data['equipment_cost']; ?>
                                </td>
                            </tr>
                            <tr style='color: #000;'>
                                <td></td>
                                <td>
                                    Total
                                </td>
                                <td>
                                    <?php echo $msme_data['cliam_amount_total']; ?>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </td>
            </tr>
        </table>
        <br/>
        <!-- <div style="font-size: 14px; text-align: center;font-weight: bold;"><u>PART E</u></div><br/> -->
        <div style="font-size: 14px; text-align: center;font-weight: bold;" >6. Name of the Scheme : INCENTIVES FOR LOCAL EMPLOYMENT</div>
        <br/>
         <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Total Number of Local Employment Newly recruited :</td>
                <td class="third-column">
                    <?php echo $msme_data['newly_requit_emp']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Total Expenditure made on Local Employment (In Lakhs) (As per Annexure-III):</td>
                <td class="third-column">
                    <?php echo $msme_data['emp_total_expenditure']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Total Amount Claim for Assistance (3 Lakhs for 20 Local People maximum 15 Lakhs) (In Lakhs) :</td>
                <td class="third-column">
                    <?php echo $msme_data['assclaim_amount']; ?>
                </td>
            </tr>
        </table>
        <br/>
        <div style="font-size: 14px; text-align: center;font-weight: bold;"><u>DECLARATION </u></div><br/>
        <br/>
        <div style="font-size: 14px;" >I/We hereby declare that all the information given above and the statements and other documents enclosed are to the best of my/our knowledge and belief, true and correct.
        <br><br>
        I / We hereby agree that, I / We shall forthwith repay the Capital Subsidy / Special Capital Subsidy for Thrust sector enterprises / Employment Intensive Subsidy / Additional Capital Subsidy for select category of entrepreneurs / Additional Capital Subsidy for promotion of Cleaner and Environment friendly technologies disbursed to the unit, if the amount of subsidy is found to have been disbursed in excess of the amount actually admissible for whatever reason. Further I/We also shall be liable to pay interest at such rate as prescribed by the Government from time to time on such amounts and such other changes / expenses which may be repayable by us.
        <br><br>
        It is further certified that I / We have not hitherto applied for or have received any amount by way of grant / subsidy in respect of this Enterprise from Government / Financial institution. </div><br/>
        <table class="" style="margin-top: 30px;">
            <tr><td class="border-none">Place :  Dadra and Nagar Haveli & Daman and Diu</td></tr>
            <tr><td class="border-none">Date :  <?php echo date('d/m/Y',strtotime($msme_data['created_time'])); ?></td></tr>
        </table>
        <table style="margin-left: 475px;">
            <tr><td class="border-none"><img src="<?php echo MSME_DOC_PATH; ?><?php echo $msme_data['sign_seal']; ?>" height="100px" width="100px"></td></tr>
        </table>
        
        <table style="margin-left: 70%;margin-top: 0px;word-spacing: 2px;">
            <tr><td class="border-none">Authorized Signatory Designation with Seal</td></tr>
        </table>
        <br/>
</body>
</html>