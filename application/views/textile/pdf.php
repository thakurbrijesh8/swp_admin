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
        <div style="text-align: center;">FOR INVESTMENT PROMOTION SCHEME - 2015 FOR Textile Sector</div>
        <br/>
        <div>1. General Information</div>
        <br/>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name of the Enterprise :</td>
                <td class="third-column">
                    <?php echo $textile_data['enterprise_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2(i) </td>
                <td class="second-column">Office Address with pin code No. :</td>
                <td class="third-column">
                    <?php echo $textile_data['office_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2(ii) </td>
                <td class="second-column">Factory Address with pin code No. :</td>
                <td class="third-column">
                    <?php echo $textile_data['office_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2(iii) </td>
                <td class="second-column">Office Contact No. :</td>
                <td class="third-column">
                    <?php echo $textile_data['office_contactno']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Factory Contact No. :</td>
                <td class="third-column">
                    <?php echo $textile_data['office_contactno']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Fax :</td>
                <td class="third-column">
                    <?php echo $textile_data['fax']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Cell Phone :</td>
                <td class="third-column">
                    <?php echo $textile_data['cellphone']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Email :</td>
                <td class="third-column">
                    <?php echo $textile_data['email']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Constitution of the Enterprise :</td>
                <td class="third-column">
                    <?php
                        if($textile_data['constitution'] == 1)
                            echo 'Partnership';
                        else if($textile_data['constitution'] == 2)
                            echo 'Company';
                        else if($textile_data['constitution'] == 3)
                            echo 'Society';
                        else if($textile_data['constitution'] == 4)
                            echo 'Others';
                    ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Name,Designation & Contact Details of the Promoter :</td>
                <td class="third-column">
                    <?php echo $textile_data['promoters_details']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5 </td>
                <td class="second-column">Social Status of the Entrepreneur :</td>
                <td class="third-column">
                    <?php echo $textile_data['is_women_entrepreneur'] == 1 ? 'Women' : ''; ?>

                    <?php if($textile_data['is_women_entrepreneur'] == 1){ ?>
                        <br/><a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_data['women_entrepreneur']; ?>" target="_blank"> View Document </a>
                    <?php } ?><br/>

                    <?php echo $textile_data['is_sc_st_entrepreneur'] == 1 ? 'SC/ST' : ''; ?>

                    <?php if($textile_data['is_sc_st_entrepreneur'] == 1){ ?>
                        <br/><a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_data['sc_st_entrepreneur']; ?>" target="_blank"> View Document </a>
                    <?php } ?><br/>

                    <?php echo $textile_data['is_physically_entrepreneur'] == 1 ? 'Physically Disabled' : ''; ?>

                    <?php if($textile_data['is_physically_entrepreneur'] == 1){ ?>
                        <br/><a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_data['physically_entrepreneur']; ?>" target="_blank"> View Document </a>
                    <?php } ?><br/>

                    <?php echo $textile_data['is_transgender_entrepreneur'] == 1 ? 'Transgender' : ''; ?>

                    <?php if($textile_data['is_transgender_entrepreneur'] == 1){ ?>
                        <br/><a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_data['transgender_entrepreneur']; ?>" target="_blank"> View Document </a>
                    <?php } ?><br/>

                    <?php echo $textile_data['is_other_entrepreneur'] == 1 ? 'Others' : ''; ?>

                    <?php if($textile_data['is_other_entrepreneur'] == 1){ ?>
                        <br/><a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_data['other_entrepreneur']; ?>" target="_blank"> View Document </a>
                    <?php } ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">6 </td>
                <td class="second-column">If Women / SC , ST / Physically Disabled / Transgender, please indicate % share of the Proprietor / Partner(s) / Director(s) in the equity:</td>
                <td class="third-column">
                    <?php 
                        if($textile_data['proprietor_share_details']){ ?>
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
                                    $proprietorinfo = json_decode($textile_data['proprietor_share_details'], TRUE);
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
                    <?php echo $textile_data['othorized_person_detail']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">8 </td>
                <td class="second-column">Type of the Unit :</td>
                <td class="third-column">
                    <?php
                        if($textile_data['unit_type'] == 1)
                            echo 'Micro';
                        else if($textile_data['unit_type'] == 2)
                            echo 'Small';
                        else if($textile_data['unit_type'] == 3)
                            echo 'Medium';
                    ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">9 </td>
                <td class="second-column">Category of the Enterprise :</td>
                <td class="third-column">
                    <?php
                        if($textile_data['category'] == 1)
                            echo 'New';
                        else if($textile_data['category'] == 2)
                            echo 'Expansion';
                    ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">10 </td>
                <td class="second-column">Part i E.M. No. :</td>
                <td class="third-column">
                    <?php echo $textile_data['emno_part1']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Part i E.M. Date :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($textile_data['emdate_part1'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"></td>
                <td class="second-column">Part ii E.M. No. :</td>
                <td class="third-column">
                    <?php echo $textile_data['emno_part2']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Part ii E.M. Date :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($textile_data['emdate_part2'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Manufacturing items :</td>
                <td class="third-column">
                    <?php echo $textile_data['manufacturing_items']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Annual production capacity (In MT p.a.) :</td>
                <td class="third-column">
                    <?php echo $textile_data['annual_capacity']; ?>
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
                    <?php echo $textile_data['approval_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Date :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($textile_data['pccno_date'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Valid upto Date :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($textile_data['pccno_validupto_date'])); ?>
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
                    <?php echo $textile_data['factory_registration_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Date :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($textile_data['establishment_date'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Valid upto Date :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($textile_data['establishment_validupto_date'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">13 </td>
                <td class="second-column">Date of commencement of Commercial Production :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($textile_data['commencement_date'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">14 </td>
                <td class="second-column">Annual Turnover (Actual/Estimated) :</td>
                <td class="third-column">
                    <?php echo date("Y",strtotime("-1 year")); ?> : <?php echo $textile_data['annual_turnover']; ?><br/>
                    <?php echo date("Y",strtotime("-2 year")); ?> : <?php echo $textile_data['annual_turnover_one']; ?><br/>
                    <?php echo date("Y",strtotime("-3 year")); ?> : <?php echo $textile_data['annual_turnover_two']; ?><br/>
                    <?php echo date("Y",strtotime("-4 year")); ?> : <?php echo $textile_data['annual_turnover_three']; ?><br/>
                    <?php echo date("Y",strtotime("-5 year")); ?> : <?php echo $textile_data['annual_turnover_four']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">15 </td>
                <td class="second-column">Whether any financial assistance granted by Govt. of india / others ? (if Yes, please attech details) :</td>
                <td class="third-column">
                    <?php echo $textile_data['financial_assistance'] == 1 ? 'YES' : 'NO' ; ?><br/>
                    <?php if($textile_data['financial_assistance'] == 1){ ?>
                        <a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_data['financial_assistance_upload']; ?>" target="_blank"> View Document </a>
                    <?php } ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">16 </td>
                <td class="second-column">Whether any Government dues are outstanding OR Court case against Govt. ? (if Yes, please attech details) :</td>
                <td class="third-column">
                    <?php echo $textile_data['govt_dues'] == 1 ? 'YES' : 'NO'; ?><br/>
                    <?php if($textile_data['govt_dues'] == 1){ ?>
                        <a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_data['govt_dues_upload']; ?>" target="_blank"> View Document </a>
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
                    <?php echo $textile_data['bank_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Bank Account No :</td>
                <td class="third-column">
                    <?php echo $textile_data['account_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">IFSC Code No. :</td>
                <td class="third-column">
                    <?php echo $textile_data['ifsc_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Branch Code No :</td>
                <td class="third-column">
                    <?php echo $textile_data['bankbranch_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">PAN Card No. of the Unit :</td>
                <td class="third-column">
                    <?php echo $textile_data['pancard_no']; ?>
                </td>
            </tr>
        </table>
        <br/>
        <!-- <div style="font-size: 14px; text-align: center;font-weight: bold;"><u>PART F</u></div><br/> -->
        <div style="font-size: 14px; text-align: center;font-weight: bold;" >2. Name of the Scheme : INTEREST SUBSIDY FOR TEXTILE SECTOR </div>
        <br/>
         <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name of the Enterprise:</td>
                <td class="third-column">
                    <?php echo $textile_partf_data['enterprise_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Category of the Enterprise :</td>
                <td class="third-column">
                    <?php
                        if($textile_partf_data['enterprise_category'] == 1)
                            echo 'New';
                        else if($textile_partf_data['enterprise_category'] == 2)
                            echo 'Expansion';
                        else if($textile_partf_data['enterprise_category'] == 3)
                            echo 'Diversification';
                        else if($textile_partf_data['enterprise_category'] == 4)
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
                <td class="second-column">Investment made in Plant & Machinery  - (In Lacs):</td>
                <td class="third-column">
                    <?php echo $textile_partf_data['investment']; ?>
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
                    <?php echo $textile_partf_data['machinery_units']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">New Investment in Plant & Machinery :</td>
                <td class="third-column">
                    <?php echo $textile_partf_data['new_investment']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Increase in Investment (%) :</td>
                <td class="third-column">
                    <?php echo $textile_partf_data['investment_percentage']; ?>
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
                                <td><?php echo $textile_partf_data['contribution']; ?></td>
                                <td>
                                    <?php echo $textile_partf_data['term_loan']; ?>
                                </td>
                                <td>
                                    <?php echo $textile_partf_data['unsecured_loan']; ?>
                                </td>
                                <td>
                                    <?php echo $textile_partf_data['accruals']; ?>
                                </td>
                                <td>
                                    <?php echo $textile_partf_data['finance_total']; ?>
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
                        if($textile_partf_data['financial_data_info']){ ?>
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
                                $financialinfo = json_decode($textile_partf_data['financial_data_info'], TRUE);
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
                    <?php echo date('d/m/Y',strtotime($textile_partf_data['term_loan_date'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">8 </td>
                <td class="second-column">Term Loan Account No. :</td>
                <td class="third-column">
                    <?php echo $textile_partf_data['loan_accountno']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">9(i) </td>
                <td class="second-column">Project Report,covering Project Profile :</td>
                <td class="third-column">
                    <a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_partf_data['project_profile_uploader']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column">9(ii) </td>
                <td class="second-column">Details of equipments & machineries :</td>
                <td class="third-column">
                    <a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_partf_data['details_uploader']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column">9(iii) </td>
                <td class="second-column">Fixed Capital investment :</td>
                <td class="third-column">
                    <a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_partf_data['investment_uploader']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column">10 </td>
                <td class="second-column">Total Amount Claim For Assistance  :</td>
                <td class="third-column"></td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Interest Subsidy @ 5% (max. 50 Lakhs) per annum  :</td>
                <td class="third-column">
                    <?php echo $textile_partf_data['interest_subsidy']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Any Other Information  :</td>
                <td class="third-column">
                    <?php echo $textile_partf_data['other_info']; ?>
                </td>
            </tr>
        </table>
        <br/>
        <!-- <div style="font-size: 14px; text-align: center;font-weight: bold;"><u>PART G</u></div><br/> -->
        <div style="font-size: 14px; text-align: center;font-weight: bold;" >3. Name of the Scheme : INTEREST SUBSIDY IN TECHNICAL TEXTILE </div>
        <br/>
         <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name of the Enterprise:</td>
                <td class="third-column">
                    <?php echo $textile_partg_data['enterprise_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Category of the Enterprise :</td>
                <td class="third-column">
                    <?php
                        if($textile_partg_data['enterprise_category'] == 1)
                            echo 'New';
                        else if($textile_partg_data['enterprise_category'] == 2)
                            echo 'Expansion';
                        else if($textile_partg_data['enterprise_category'] == 3)
                            echo 'Diversification';
                        else if($textile_partg_data['enterprise_category'] == 4)
                            echo 'Modernization';
                    ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Sector of Technical Textile (from 13 sector as in Scheme) :</td>
                <td class="third-column">
                    <?php echo $textile_partg_data['sector_textile']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">For New Project :</td>
                <td class="third-column">
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Investment made in Plant & Machinery  - (In Lacs):</td>
                <td class="third-column">
                    <?php echo $textile_partg_data['investment']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5 </td>
                <td class="second-column">For Unit going under Expansion / Diversification / Modernization (in Lakhs) :</td>
                <td class="third-column">
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Investment already made in Plant & Machinery in Existing Unit :</td>
                <td class="third-column">
                    <?php echo $textile_partg_data['machinery_units']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">New Investment in Plant & Machinery :</td>
                <td class="third-column">
                    <?php echo $textile_partg_data['new_investment']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Increase in Investment (%) :</td>
                <td class="third-column">
                    <?php echo $textile_partg_data['investment_percentage']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">6 </td>
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
                                <td><?php echo $textile_partg_data['contribution']; ?></td>
                                <td>
                                    <?php echo $textile_partg_data['term_loan']; ?>
                                </td>
                                <td>
                                    <?php echo $textile_partg_data['unsecured_loan']; ?>
                                </td>
                                <td>
                                    <?php echo $textile_partg_data['accruals']; ?>
                                </td>
                                <td>
                                    <?php echo $textile_partg_data['finance_total']; ?>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </td>
            </tr>
            <tr>
                <td class="first-column">7 </td>
                <td class="second-column">Details of Financial Institution  :</td>
                <td class="third-column">
                    <?php 
                        if($textile_partg_data['financial_data_info']){ ?>
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
                                $financialinfo = json_decode($textile_partg_data['financial_data_info'], TRUE);
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
                <td class="first-column">8 </td>
                <td class="second-column">Date of First Disbursement of Term Loan :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($textile_partg_data['term_loan_date'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">9 </td>
                <td class="second-column">Term Loan Account No. :</td>
                <td class="third-column">
                    <?php echo $textile_partg_data['loan_accountno']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">10 </td>
                <td class="second-column">Project Report,covering Project Profile :</td>
                <td class="third-column">
                    <a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_partg_data['project_profile_uploader']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Details of equipments & machineries :</td>
                <td class="third-column">
                    <a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_partg_data['details_uploader']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Fixed Capital investment :</td>
                <td class="third-column">
                    <a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_partg_data['investment_uploader']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column">11 </td>
                <td class="second-column">Total Amount Claim For Assistance  :</td>
                <td class="third-column"></td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Interest Subsidy @ 5% (max. 50 Lakhs) per annum  :</td>
                <td class="third-column">
                    <?php echo $textile_partg_data['interest_subsidy']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Any Other Information  :</td>
                <td class="third-column">
                    <?php echo $textile_partg_data['other_info']; ?>
                </td>
            </tr>
        </table>
        <br/>
        <!-- <div style="font-size: 14px; text-align: center;font-weight: bold;"><u>PART H</u></div><br/> -->
        <div style="font-size: 14px; text-align: center;font-weight: bold;" >4. Name of the Scheme : ASSISTANCE FOR TECHNOLOGY UPGRADATION  </div>
        <br/>
         <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name of the Enterprise:</td>
                <td class="third-column">
                    <?php echo $textile_parth_data['enterprise_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Purpose of Technology :</td>
                <td class="third-column">
                    <?php
                        if($textile_parth_data['technology_purpose'] == 1)
                            echo 'Acquisition';
                        else if($textile_parth_data['technology_purpose'] == 2)
                            echo 'Upgradation';
                    ?>
                </td>
            </tr>
            <!-- <tr>
                <td class="first-column"> </td>
                <td class="second-column">Sector of Technical Textile (from 13 sector as in Scheme) :</td>
                <td class="third-column">
                    <?php //echo $textile_parth_data['sector_textile']; ?>
                </td>
            </tr> -->
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Whether the enterprise acquiring the technology for the first time in India for specialized application ? If so, please give the details with justification thereof :</td>
                <td class="third-column">
                    <?php echo $textile_parth_data['enterprise_accqu'] == 1 ? 'YES' : 'NO'; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Give Details with Justification :</td>
                <td class="third-column">
                    <?php echo $textile_parth_data['justification']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Brief of New Technology with manufacturing process & details thereof :</td>
                <td class="third-column">
                    <?php echo $textile_parth_data['process_detail']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Name & Address of the entity from which Technology will be acquired along with copy of :</td>
                <td class="third-column">
                    <?php echo $textile_parth_data['name_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Upload Arrangement :</td>
                <td class="third-column">
                    <a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_parth_data['project_profile_uploader']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Upload MOU / Other Document for Proof of technology acquisition & upgradation :</td>
                <td class="third-column">
                    <a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_parth_data['mou_uploader']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Date of Commencement of Commercial Production on Technology upgradation :</td>
                <td class="third-column">
                    <?php echo $textile_parth_data['commencement_date']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5 </td>
                <td class="second-column">Details of Cost of Acquisition / Upgradation (In Lakhs) :</td>
                <td class="third-column">
                    <table class="CompanyDetails" id="" style="margin-top: 10px;">
                        <thead>
                            <tr style='color: #000;'>
                                <td>Purchase of Design & Drawings</td>
                                <td>Technology Development Fees to Experts / R&D Institutions / Technical Consultancy Firm</td>
                                <td>Others</td>
                                <td>Total</td>
                            </tr>
                            <tr style='color: #000;'>
                                <td><?php echo $textile_parth_data['purchase']; ?></td>
                                <td>
                                    <?php echo $textile_parth_data['technology_fees']; ?>
                                </td>
                                <td>
                                    <?php echo $textile_parth_data['other_detail']; ?>
                                </td>
                                <td>
                                    <?php echo $textile_parth_data['upgradation_total']; ?>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </td>
            </tr>
            <tr>
                <td class="first-column">6 </td>
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
                                <td><?php echo $textile_parth_data['contribution']; ?></td>
                                <td>
                                    <?php echo $textile_parth_data['term_loan']; ?>
                                </td>
                                <td>
                                    <?php echo $textile_parth_data['unsecured_loan']; ?>
                                </td>
                                <td>
                                    <?php echo $textile_parth_data['accruals']; ?>
                                </td>
                                <td>
                                    <?php echo $textile_parth_data['finance_total']; ?>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </td>
            </tr>
            <tr>
                <td class="first-column">7 </td>
                <td class="second-column">Details of Financial Institution  :</td>
                <td class="third-column">
                    <?php 
                        if($textile_parth_data['financial_data_info']){ ?>
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
                                $financialinfo = json_decode($textile_parth_data['financial_data_info'], TRUE);
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
                <td class="first-column">8</td>
                <td class="second-column">Date of First Disbursement of Term Loan :</td>
                <td class="third-column">
                    <?php echo date('d/m/Y',strtotime($textile_parth_data['term_loan_date'])); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">9 </td>
                <td class="second-column">Term Loan Account No. :</td>
                <td class="third-column">
                    <?php echo $textile_parth_data['loan_accountno']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">10 (i) </td>
                <td class="second-column">Project Report,covering Project Profile :</td>
                <td class="third-column">
                    <a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_parth_data['project_profile_uploader']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column">(ii) </td>
                <td class="second-column">Details of equipments & machineries :</td>
                <td class="third-column">
                    <a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_parth_data['details_uploader']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column">(iii) </td>
                <td class="second-column">Fixed Capital investment :</td>
                <td class="third-column">
                    <a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_parth_data['investment_uploader']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column">(iv) </td>
                <td class="second-column">Annual Production, Sales :</td>
                <td class="third-column">
                    <a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_parth_data['annual_production_uploader']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column">(vi) </td>
                <td class="second-column">Power Consumption :</td>
                <td class="third-column">
                    <a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_parth_data['power_consumption_uploader']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column">(vi) </td>
                <td class="second-column">Impact on adoption of new technology on product quality & energy consumption/savings :</td>
                <td class="third-column">
                    <a href ="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_parth_data['impact_uploader']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column">11 </td>
                <td class="second-column">Total Amount Claim for Assistance  :</td>
                <td class="third-column">
                    <?php echo $textile_parth_data['interest_subsidy']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Interest Subsidy @ 5% (max. 50 Lakhs) per annum  :</td>
                <td class="third-column">
                    <?php echo $textile_parth_data['interest_subsidy']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">12 </td>
                <td class="second-column">Any Other Information  :</td>
                <td class="third-column">
                    <?php echo $textile_parth_data['other_info']; ?>
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
        <table style="margin-left: 475px;">
            <tr><td class="border-none"><img src="<?php echo TEXTILE_DOC_PATH; ?><?php echo $textile_declaration_data['sign_seal']; ?>" height="100px" width="100px"></td></tr>
        </table>
        <table style="margin-left: 70%;margin-top: 0px;word-spacing: 2px;">
            <tr><td class="border-none">Authorized Signatory Designation with Seal</td></tr>
        </table>
        <br/>
</body>
</html>