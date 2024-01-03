<html>
    <head>
        <title>FORM I</title>
        <style type="text/css">
            body {
                font-family: serif;
                font-size: 12px;
            }
            table.CompanyDetails, td {
                width: 100%;
                border: 1px solid black;
                border-collapse: collapse;
                word-spacing: 2px;
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
        <div style="font-size: 14px; text-align: center;">Single Integrated return under all the labour laws</div>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name and address of establishment/ Factory:</td>
                <td class="third-column">
                    <?php echo $singlereturn_data['esta_name']; ?><br/>
                    <?php echo $singlereturn_data['esta_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"></td>
                <td class="second-column">
                    Tele No.  :<br/><br/>
                    Mobile No. :<br/><br/>
                    Fax No. :<br/><br/>
                    Email Address :
                </td>
                <td class="third-column">
                    <?php echo $singlereturn_data['esta_tel_no']; ?><br/><br/>
                    <?php echo $singlereturn_data['esta_mob_no']; ?><br/><br/>
                    <?php echo $singlereturn_data['esta_fax_no']; ?><br/><br/>
                    <?php echo $singlereturn_data['esta_email_id']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Name and residential address of the Employer/Occupier/contractor:</td>
                <td class="third-column">
                    <?php echo $singlereturn_data['emp_name']; ?><br/>
                    <?php echo $singlereturn_data['emp_address']; ?><br/>
                </td>
            </tr>
            <tr>
                <td class="first-column"></td>
                <td class="second-column">
                    Tele No.  :<br/><br/>
                    Mobile No. :<br/><br/>
                    Fax No. :<br/><br/>
                    Email Address :
                </td>
                <td class="third-column">
                    <?php echo $singlereturn_data['emp_tel_no']; ?><br/><br/>
                    <?php echo $singlereturn_data['emp_mob_no']; ?><br/><br/>
                    <?php echo $singlereturn_data['emp_fax_no']; ?><br/><br/>
                    <?php echo $singlereturn_data['emp_email_id']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Name and residential address of the manager of person responsible for supervision or control of the establishment / factory :</td>
                <td class="third-column">
                    <?php echo $singlereturn_data['manager_name']; ?><br/>
                    <?php echo $singlereturn_data['manager_address']; ?><br/>
                </td>
            </tr>
            <tr>
                <td class="first-column"></td>
                <td class="second-column">
                    Tele No.  :<br/><br/>
                    Mobile No. :<br/><br/>
                    Fax No. :<br/><br/>
                    Email Address :
                </td>
                <td class="third-column">
                    <?php echo $singlereturn_data['manager_tel_no']; ?><br/><br/>
                    <?php echo $singlereturn_data['manager_mob_no']; ?><br/><br/>
                    <?php echo $singlereturn_data['manager_fax_no']; ?><br/><br/>
                    <?php echo $singlereturn_data['manager_email_id']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Registration No./Licence No. and date of commencement of the establishment/ Factory :</td>
                <td class="third-column">
                    <?php echo "Registration No. :".$singlereturn_data['registration_no']; ?><br/><br/>
                    <?php echo "Licence No. :".$singlereturn_data['license_no']; ?><br/><br/>
                    <?php echo " date of commencement :".$singlereturn_data['commencement_date']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5 </td>
                <td class="second-column">Nature of Industry/ activity  :</td>
                <td class="third-column">
                    <?php echo $singlereturn_data['industry_nature']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">6 </td>
                <td class="second-column">Number of Employees employed : <br/>(Including contract workers)  :</td>
                <td class="third-column">
                    <table class="CompanyDetails" id="" style="margin-top: 10px;">
                                <thead>
                                    <tr style='color: #000;'>
                                        <td>Type of worker</td>
                                        <td>Unskilled</td>
                                        <td>Semi skilled</td>
                                        <td>Skilled</td>
                                        <td>Total</td>
                                        <td>Male</td>
                                        <td>Female</td>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <td>Direct</td>
                                        <td>
                                            <?php echo $singlereturn_data['direct_unskilled']; ?>
                                        </td>
                                        <td>
                                            <?php echo $singlereturn_data['direct_semiskilled']; ?>
                                        </td>
                                        <td>
                                            <?php echo $singlereturn_data['direct_skilled']; ?>
                                        </td>
                                        <td>
                                            <?php echo $singlereturn_data['direct_total']; ?>
                                        </td>
                                        <td>
                                           <?php echo $singlereturn_data['direct_male']; ?>
                                        </td>
                                        <td>
                                            <?php echo $singlereturn_data['direct_female']; ?>
                                        </td>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <td>Through Contractor</td>
                                        <td>
                                            <?php echo $singlereturn_data['contractor_unskilled']; ?>
                                        </td>
                                        <td>
                                            <?php echo $singlereturn_data['contractor_semiskilled']; ?>
                                        </td>
                                        <td>
                                            <?php echo $singlereturn_data['contractor_skilled']; ?>
                                        </td>
                                        <td>
                                            <?php echo $singlereturn_data['contractor_total']; ?>
                                        </td>
                                        <td>
                                           <?php echo $singlereturn_data['contractor_male']; ?>
                                        </td>
                                        <td>
                                            <?php echo $singlereturn_data['contractor_female']; ?>
                                        </td>
                                    </tr>
                                    <tr style='color: #000;'>
                                        <td>Total</td>
                                        <td>
                                            <?php echo $singlereturn_data['total_unskilled']; ?>
                                        </td>
                                        <td>
                                            <?php echo $singlereturn_data['total_semiskilled']; ?>
                                        </td>
                                        <td>
                                            <?php echo $singlereturn_data['total_skilled']; ?>
                                        </td>
                                        <td>
                                            <?php echo $singlereturn_data['total_total']; ?>
                                        </td>
                                        <td>
                                           <?php echo $singlereturn_data['total_male']; ?>
                                        </td>
                                        <td>
                                            <?php echo $singlereturn_data['total_female']; ?>
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                </td>
            </tr>
    </table>
    <br/>
    <br/>
    <div style="font-size: 14px; text-align: center;font-weight: bold;"><u>PART A</u></div><br/>
    <div style="font-size: 14px;" >My establishment is covered under the Minimum Wages Act, 1948 and rules made thereunder and all workers/ office staff are paid wages overtime wages as prescribed by the Administration </div>
    <br/>
     <table class="CompanyDetails">
        <tr>
            <td class="first-column">1 </td>
            <td class="second-column">Number of days the esytablishment/factory worked in this year:</td>
            <td class="third-column">
                <?php echo $singlereturn_data['worked_days']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">2 </td>
            <td class="second-column">Number of man days worked in the year:</td>
            <td class="third-column">
                <?php echo $singlereturn_data['man_worked_days']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">3 </td>
            <td class="second-column">Number of average employees employed in the year:</td>
            <td class="third-column">
                <?php echo $singlereturn_data['average_emp']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">4 </td>
            <td class="second-column">Total wages paid category wise :</td>
            <td class="third-column">
                <?php echo "Male :".$singlereturn_data['male_wages']; ?><br/>
                <?php echo "Female :".$singlereturn_data['female_wages']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">5 </td>
            <td class="second-column">Total Fine Imposed: , if any:</td>
            <td class="third-column">
                <?php echo $singlereturn_data['total_fine']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">6 </td>
            <td class="second-column">Other deductions: ,if any :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['deduction']; ?>
            </td>
        </tr>
    </table>
    <br/>
    <br/>
    <div style="font-size: 14px; text-align: center;font-weight: bold;"><u>PART B</u></div><br/>
    <div style="font-size: 14px;" >The Part A and B are to be furnished if the maximum number of employees employed on any day during the year under report exceed 9(Nine) </div><br/>
    <div style="font-size: 14px;" >My establishment is covered under the Payment of Bonus Act, 1965 and the workers are paid bonus. I have maintained records and registers as per the Act. 
    </div>
    <br/>
    <table class="CompanyDetails">
        <tr>
            <td class="first-column">1 </td>
            <td class="second-column">Percentage of bonus paid:</td>
            <td class="third-column">
                <?php echo $singlereturn_data['percentage_of_bonus']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">2 </td>
            <td class="second-column">Number of beneficiaries:</td>
            <td class="third-column">
                <?php echo $singlereturn_data['no_of_baneficiaries']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">3 </td>
            <td class="second-column">Total amount of bonus paid :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['total_bonus_paid']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">4 </td>
            <td class="second-column">Date of payment :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['payment_date']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">5 </td>
            <td class="second-column">If bonus is not paid, reason there of :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['not_paid_reason']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">6 </td>
            <td class="second-column">Other deductions: ,if any :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['deduction']; ?>
            </td>
        </tr>
    </table>
    <br/>
    <br/>
    <div style="font-size: 14px; text-align: center;font-weight: bold;"><u>PART C</u></div><br/>
    <div style="font-size: 14px;" >Part A, B & C are to be furnished, if the establishment has employed more then 9 contract labour on any day during the year under report. (Details to be provided by the Principal Employer) </div><br/>
    <div style="font-size: 14px;" >My establishment is covered under Contract Labour (Regulation and Abolition) Act,1970 and the workers are paid wages and overtime wages as prescribed by the Administration
    </div>
    <br/>
    <table class="CompanyDetails">
        <tr>
            <td class="first-column">1 </td>
            <td class="second-column">Name and postal address of the contractor:</td>
            <td class="third-column">
                <?php echo $singlereturn_data['contractor_name']; ?><br/>
                <?php echo $singlereturn_data['contractor_address']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">2 </td>
            <td class="second-column">Nature of work/operations of contractor:</td>
            <td class="third-column">
                <?php echo $singlereturn_data['contractor_nature']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">3 </td>
            <td class="second-column">Total number of days during the year on which contract labour was employed :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['total_employed_labour']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">4 </td>
            <td class="second-column">Total number of man days worked during the year by contract labour :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['total_worked_days_by_labour']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">5 </td>
            <td class="second-column">Total number of days during the year on which direct labour was employed :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['total_employed_direct_labour']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">6 </td>
            <td class="second-column"> Total number of man days worked by direct labour  :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['total_worked_days_by_direct_labour']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">7 </td>
            <td class="second-column">Change, if any, in the management of establishment its locations, or any other particulars furnished to the Registering Officer in the application for the registration (Details may be furnished with dates of changes)   :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['change_management_details']; ?>
            </td>
        </tr>
    </table>
    <br/>
    <br/>
    <div style="font-size: 14px; text-align: center;font-weight: bold;"><u>YEARLY RETURN to be submitted by the Contractors</u></div><br/>
    <br/>
    <table class="CompanyDetails">
        <tr>
            <td class="first-column">1 </td>
            <td class="second-column">Duration of contract Number of days worked during the year :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['duration_of_contract']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">2 </td>
            <td class="second-column">Average number of contract labour worked on any day during the year:</td>
            <td class="third-column">
                <?php echo $singlereturn_data['no_of_contract_labour']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">3 </td>
            <td class="second-column">Details of :<br/><br/>
                (a)Working hours<br/><br/>
                (b)Overtime work<br/><br/>
                (c)Weekly holiday<br/><br/>
                (d)Spread over<br/><br/>
                (e)Weekly holiday paid or not
            </td>
            <td class="third-column"><br/><br/>
                <?php echo $singlereturn_data['working_hours']; ?><br/><br/>
                <?php echo $singlereturn_data['overtime_work']; ?><br/><br/>
                <?php echo $singlereturn_data['weekly_holiday']; ?><br/><br/>
                <?php echo $singlereturn_data['spread_over']; ?><br/><br/>
                <?php echo $singlereturn_data['is_paid_weekly_holiday'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">4 </td>
            <td class="second-column">Number of mandays worked During the year :<br/><br/>
                Male :<br/><br/>
                Female :<br/><br/>
                Total :
            </td>
            <td class="third-column"><br/><br/>
                <?php echo $singlereturn_data['male_worked_days']; ?><br/><br/>
                <?php echo $singlereturn_data['female_worked_days']; ?><br/><br/>
                <?php echo $singlereturn_data['total_worked_days']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">5 </td>
            <td class="second-column">Amount of wages paid :</td><br/>
            <td class="third-column">
                <?php echo $singlereturn_data['paid_amount']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">6 </td>
            <td class="second-column"> Amount of deduction from wages  :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['amount_deduction']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">7 </td>
            <td class="second-column">The following has been provided ?<br/><br/>
                Canteen  :<br/><br/>
                Rest rooms :<br/><br/>
                Drinking water :<br/><br/>
                Creches :<br/><br/>
                First aid :</td>
            <td class="third-column"><br/><br/>
                <?php echo $singlereturn_data['is_provide_canteen'] == 1 ? 'YES' : 'NO'; ?><br/><br/>
                <?php echo $singlereturn_data['is_provide_restroom'] == 1 ? 'YES' : 'NO'; ?><br/><br/>
                <?php echo $singlereturn_data['is_provide_drinking_water'] == 1 ? 'YES' : 'NO'; ?><br/><br/>
                <?php echo $singlereturn_data['is_provide_creches'] == 1 ? 'YES' : 'NO'; ?><br/><br/>
                <?php echo $singlereturn_data['is_provide_firstaid'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
    </table>
    <br/>
    <br/>
    <div style="font-size: 14px; text-align: center;font-weight: bold;"><u>Part D </u></div><br/>
    <div style="font-size: 14px;" >Details under The Factories Act, 1948 and rules made there under </div><br/>
    <table class="CompanyDetails">
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Factory Identification Details :</td>
            <td class="third-column"></td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">FIN (Factory Identification Number) :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['fin']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">NIC Code (Five digit) :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['nic_code']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Sector (Public / Co-operative / Joint Venture :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['sector']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Registration under section {2m (i) / 2m (ii) / 85} :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['registration_section']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Registration No :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['registration_no']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Licensed No :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['license_no']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Licensed workers :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['license_workers']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Licensed H.P  :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['license_hp']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">License renewal position (year) :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['license_renewal_year']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">License renewal application submitted for the year :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['license_submitted_year']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Plan approval No. :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['plan_approval_no']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Date :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['plan_approval_date']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Stability certificate (i) Obtained on Date :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['certificate_obtain_on_date']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Stability certificate (ii) Submitted on date :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['certificate_submitted_on_date']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Finished product  :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['finished_product']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Intermediates :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['intermediates']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Raw materials :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['raw_materials']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">B </td>
            <td class="second-column">Details of employment </td>
            <td class="third-column"></td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Average daily workers <br/><br/>
            Male<br/><br/>
            Female :</td>
            <td class="third-column"><br/><br/>
                <?php echo $singlereturn_data['male_average_workers']; ?><br/><br/>
                <?php echo $singlereturn_data['female_average_workers']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Number of days the factory worked during previous Year : </td>
            <td class="third-column">
                <?php echo $singlereturn_data['factory_worked_days']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Number of man days worked (i.e. aggregate attendance during the Previous year)<br/><br/> (a) Adults: <br/>
            (1) Men : <br/><br/>
            (2) Women : <br/><br/>
            (3) Total : <br/><br/><br/>
            (b) Adolescents : <br/>
            (1) Men : <br/><br/>
            (2) Women : <br/><br/>
            (3) Total : 
            </td>
            <td class="third-column"><br/><br/><br/><br/>
                <?php echo $singlereturn_data['adult_men_worked_days']; ?><br/><br/>
                <?php echo $singlereturn_data['adult_women_worked_days']; ?><br/><br/>
                <?php echo $singlereturn_data['adult_total_worked_days']; ?><br/><br/>
                <br/><br/>
                <?php echo $singlereturn_data['adolescent_men_worked_days']; ?><br/><br/>
                <?php echo $singlereturn_data['adolescent_women_worked_days']; ?><br/><br/>
                <?php echo $singlereturn_data['adolescent_total_worked_days']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Average number of workers employed daily .i.e. Man days worked divided by number of days worked<br/><br/> (a) Adults: <br/>
            (1) Men : <br/><br/>
            (2) Women : <br/><br/>
            (3) Total : <br/><br/><br/>
            (b) Adolescents : <br/>
            (1) Men : <br/><br/>
            (2) Women : <br/><br/>
            (3) Total : 
            </td>
            <td class="third-column"><br/><br/><br/><br/>
                <?php echo $singlereturn_data['adult_men_workers_employed']; ?><br/><br/>
                <?php echo $singlereturn_data['adult_women_workers_employed']; ?><br/><br/>
                <?php echo $singlereturn_data['adult_total_workers_employed']; ?><br/><br/>
                <br/><br/>
                <?php echo $singlereturn_data['adolescent_men_workers_employed']; ?><br/><br/>
                <?php echo $singlereturn_data['adolescent_women_workers_employed']; ?><br/><br/>
                <?php echo $singlereturn_data['adolescent_total_workers_employed']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Total number of man-hours worked including overtime but excluding rest interval.<br/><br/> (a) Adults: <br/>
            (1) Men : <br/><br/>
            (2) Women : <br/><br/>
            (3) Total : <br/><br/><br/>
            (b) Adolescents : <br/>
            (1) Men : <br/><br/>
            (2) Women : <br/><br/>
            (3) Total : 
            </td>
            <td class="third-column"><br/><br/><br/><br/>
                <?php echo $singlereturn_data['adult_men_work_hours']; ?><br/><br/>
                <?php echo $singlereturn_data['adult_women_work_hours']; ?><br/><br/>
                <?php echo $singlereturn_data['adult_total_work_hours']; ?><br/><br/>
                <br/><br/>
                <?php echo $singlereturn_data['adolescent_men_work_hours']; ?><br/><br/>
                <?php echo $singlereturn_data['adolescent_women_work_hours']; ?><br/><br/>
                <?php echo $singlereturn_data['adolescent_total_work_hours']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">C </td>
            <td class="second-column">Compliance Status for Health Provisions </td>
            <td class="third-column"></td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Measures taken for prevention of dust / fumes generated in the process  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_dust_generated'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Provision of wholesome drinking water (Sec. 18).   </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_provide_drinking_water'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Provision of Urinals, Latrines & Bathrooms facilities separately for men and women (give Number for each) (Sec. 19).  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_provide_washroom'] == 1 ? 'YES' : 'NO'; ?><br/>
                <?php echo "Men :".$singlereturn_data['washroom_for_men']; ?>
                <?php echo "Women :".$singlereturn_data['washroom_for_women']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Maintenance of health records  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_health_record_maintain'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Provision of Occupational Health Center  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_provide_health_center'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Provision of Factory Medical Officer if applicable (Retainer ship base-/ Part time / Full time)  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_provide_medical_officer'] == 1 ? 'YES' : 'NO'; ?><br/>
                <?php echo $singlereturn_data['retainer_ship']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Number of Industrial Hygienists employed to monitor work, environment as required under Section 7-A, 112. </td>
            <td class="third-column">
                <?php echo $singlereturn_data['no_of_hyginists_employed']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">D </td>
            <td class="second-column">Compliance status for Safety provisions </td>
            <td class="third-column"></td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Compliance of safety provisions prescribed under Schedules, including guarding of machinery. (Sec.21, 22). </td>
            <td class="third-column">
                <?php echo $singlereturn_data['safety_provision']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Whether safe means of access provided to plants &machinery (Sec.32, 33) </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_provide_safe_access'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Whether emergency fire exits provided </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_provide_fire_exits'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Details of fire fighting equipments including water storage capacity & trained personal. </td>
            <td class="third-column">
                <?php echo $singlereturn_data['fighting_equipments_details']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Whether hoists, lifts, cranes, lifting tackles & lifting devices are certified duly by Competent Person in prescribed forms? (Sec.28, Sec.29)  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_devices_certified'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Whether pressure vessels in use are tested by Competent Person & duly certified in prescribed form. (Sec.31)  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_pressure_vessels_certified'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Details of personal protective equipments provided and special safety equipments if any. (Sec.41)  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['personal_equipments_details']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Details of Safety Officers & Safety Supervisors (Sec.40)  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['safety_officers_detail']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Safety Committee functioning ? (if applicable) </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_functioning_safety_committee'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Whether provisions of Chapter-IVA there under complied with (if covered under Schedule-I framed under Sec.2cb) (Sec. 41B to41H) .  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_provision_of_chapteriva'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Number of Safety programs for training & safety awareness arranged during last year And number of workers trained through it. </td>
            <td class="third-column">
                <?php echo $singlereturn_data['no_of_safety_programs']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">For Major Accident Hazard Factories. </td>
            <td class="third-column"></td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(a) Onsite emergency plan prepared / amended date </td>
            <td class="third-column">
                <?php echo $singlereturn_data['amended_date']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(b) Rehearsals done for Onsite Emergency Plan during last year.(Give dates) </td>
            <td class="third-column">
                <?php echo $singlereturn_data['rehearsals_date']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(c) Details of Safety Policy, Safety Audit & Safety Report. (if applicable) </td>
            <td class="third-column">
                <?php echo $singlereturn_data['safety_policy_detail']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(d) Whether information regarding hazards and actions taken provided to public, workers and authorities.  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_action_taken'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">E </td>
            <td class="second-column">Compliance status for Welfare provisions </td>
            <td class="third-column"></td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Whether first aid facilities are provided as per rules. (Sec. 45)  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_firstaid_provide'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Provision of Ambulance Room, required staff, Ambulance Van (if applicable) (Sec.45)  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_ambulance_room_provide'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(a) Whether canteen facility provided as per standards prescribed if niore chan 250 workers are employed. (Sec. 46)  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_provide_canteen'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(b) Is canteen managed / run departmentally? through a contractor ?   </td>
            <td class="third-column">
                <?php echo $singlereturn_data['canteen_managed_by']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Whether Rest Rooms and Lunch Rooms are provided ? If more than 150 workers are employed. (Sec. 47)   </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_provide_rest_room'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Whether crèche facilities are provided forthe use of children of women employees ? (if more than 30 women are employed) (Sec.48)  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_provide_creche'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Whether Welfare Officer is appointed as per the provisions laid down (Sec.49)  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_welfare_officer_apponyed'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">F </td>
            <td class="second-column">Compliance status of Working Hours provisions  </td>
            <td class="third-column"></td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Compliance of provisions relating to working hours for adults i.e. 9 hours a day and 48 hours per week, (Sec. 51) </td>
            <td class="third-column">
                <?php echo $singlereturn_data['working_hours_for_adults']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Whether notice of period of work displayed on notice board ? (Sec. 61)</td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_disply_period_of_work'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(a) Normal working time for women workers - In case of relaxation granted for working hours of women workers, whether return & transport and security facilities provided </td>
            <td class="third-column">
                <?php echo $singlereturn_data['working_hours_for_women']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(b) Whether certificates of fitness are obtained foremployment of young persons (above 14 yrs) in the prescribed Form No.5 (Sec.69)  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_obtain_fitness_certificate'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">G </td>
            <td class="second-column">Compliance status for Annual leave with wages </td>
            <td class="third-column"></td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Whether leave with wages are allowed to the eligible employees (Sec.79)  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_leave_with_wages']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Total number of workers discharged / dismissed from the service /quit employment / super annuated /died while in service during the previous year  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['no_of_worker_dismissed']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Number of workers in respect of whom wages : in lieu of leave were paid  </td>
            <td class="third-column">
                <?php echo $singlereturn_data['no_of_paid_leave_worker']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Leave with wages  </td>
            <td class="third-column"></td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Total number of workers employed during the year <br/><br/> (a) Adults: <br/>
            (1) Men : <br/><br/>
            (2) Women : <br/><br/>
            (3) Total : <br/><br/><br/>
            (b) Adolescents : <br/>
            (1) Men : <br/><br/>
            (2) Women : <br/><br/>
            (3) Total : 
            </td>
            <td class="third-column"><br/><br/><br/><br/>
                <?php echo $singlereturn_data['adult_men_workers_employed_year']; ?><br/><br/>
                <?php echo $singlereturn_data['adult_women_workers_employed_year']; ?><br/><br/>
                <?php echo $singlereturn_data['adult_total_workers_employed_year']; ?><br/><br/>
                <br/><br/>
                <?php echo $singlereturn_data['adolescent_men_workers_employed_year']; ?><br/><br/>
                <?php echo $singlereturn_data['adolescent_women_workers_employed_year']; ?><br/><br/>
                <?php echo $singlereturn_data['adolescent_total_workers_employed_year']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Number of workers who were entitled to annual leave with wages during the year. <br/><br/> (a) Adults: <br/>
            (1) Men : <br/><br/>
            (2) Women : <br/><br/>
            (3) Total : <br/><br/><br/>
            (b) Adolescents : <br/>
            (1) Men : <br/><br/>
            (2) Women : <br/><br/>
            (3) Total : 
            </td>
            <td class="third-column"><br/><br/><br/><br/>
                <?php echo $singlereturn_data['adult_men_leave_with_wages']; ?><br/><br/>
                <?php echo $singlereturn_data['adult_women_leave_with_wages']; ?><br/><br/>
                <?php echo $singlereturn_data['adult_total_leave_with_wages']; ?><br/><br/>
                <br/><br/>
                <?php echo $singlereturn_data['adolescent_men_leave_with_wages']; ?><br/><br/>
                <?php echo $singlereturn_data['adolescent_women_leave_with_wages']; ?><br/><br/>
                <?php echo $singlereturn_data['adolescent_total_leave_with_wages']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Number of workers who were granted to annual leave with wages during the year <br/><br/> (a) Adults: <br/>
            (1) Men : <br/><br/>
            (2) Women : <br/><br/>
            (3) Total : <br/><br/><br/>
            (b) Adolescents : <br/>
            (1) Men : <br/><br/>
            (2) Women : <br/><br/>
            (3) Total : 
            </td>
            <td class="third-column"><br/><br/><br/><br/>
                <?php echo $singlereturn_data['adult_men_annual_leave_with_wages']; ?><br/><br/>
                <?php echo $singlereturn_data['adult_women_annual_leave_with_wages']; ?><br/><br/>
                <?php echo $singlereturn_data['adult_total_annual_leave_with_wages']; ?><br/><br/>
                <br/><br/>
                <?php echo $singlereturn_data['adolescent_men_annual_leave_with_wages']; ?><br/><br/>
                <?php echo $singlereturn_data['adolescent_women_annual_leave_with_wages']; ?><br/><br/>
                <?php echo $singlereturn_data['adolescent_total_annual_leave_with_wages']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">H </td>
            <td class="second-column">Reporting of accidents to Factory Inspectorate </td>
            <td class="third-column"></td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Whether arrangements are made to report the accidents involving more than 48 hours absence including serious and fatal to Factory Inspectorate? (Sec. 88) </td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_report_accident']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">Number of Accidents and Dangerous Occurrences during Previous year </td>
            <td class="third-column"></td>
        </tr>
    </table>
    <table class="CompanyDetails" id="" style="margin-top: 10px;border:1px solid black;">
            <thead>
                <tr style='color: #000;text-align: center;'>
                    <th></th>
                    <th colspan="8">Accidents involving </th>
                </tr>
                <tr style='color: #000;text-align: center;'>
                    <th></th>
                    <th colspan="3">Only non-fatal injuries </th>
                    <th colspan="5">Fatal injuries as well as non-fatal injuries </th>
                </tr>
                <tr style='color: #000;text-align: center;'>
                    <th></th>
                    <th colspan="3">Number of  </th>
                    <th colspan="5">Number of  </th>
                </tr>
                <tr style='color: #000;text-align: center;'>
                    <th></th>
                    <th>Accidents/Occurrences </th>
                    <th>Persons injured inside</th>
                    <th>Persons injured outside</th>
                    <th>Accidents/Occurrences  </th>
                    <th>Persons injured inside  </th>
                    <th>Persons injured outside </th>
                    <th>Persons killed inside   </th>
                    <th>Persons killed outside   </th>
                </tr>
                <tr style='color: #000;text-align: center;'>
                    <th></th>
                    <th></th>
                    <th colspan="2">The Factory</th>
                    <th></th>
                    <th colspan="2">The Factory</th>
                    <th colspan="2">The Factory</th>
                </tr>
                <tr style='color: #000;text-align: center;'>
                    <th>1</th>
                    <th>2 </th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                </tr>
                <tr style='color: #000;'>
                    <th>1. Accidents including dangerous occurrences and major accidents involving injuries /deaths</th>
                    <th><?php echo $singlereturn_data['nonfatal_dangerous_major_accidents']; ?></th>
                    <th><?php echo $singlereturn_data['nonfatal_dangerous_major_accidents_inside']; ?></th>
                    <th><?php echo $singlereturn_data['nonfatal_dangerous_major_accidents_outside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_dangerous_major_accidents']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_dangerous_major_accidents_inside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_dangerous_major_accidents_outside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_dangerous_major_accidents_killed_inside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_dangerous_major_accidents_killed_outside']; ?></th>
                </tr>
                <tr style='color: #000;'>
                    <th>2. Dangerous occurrences not involving injuries /deaths. </th>
                    <th><?php echo $singlereturn_data['nonfatal_nondangerous_accidents']; ?></th>
                    <th><?php echo $singlereturn_data['nonfatal_nondangerous_accidents_inside']; ?></th>
                    <th><?php echo $singlereturn_data['nonfatal_nondangerous_accidents_outside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_nondangerous_accidents']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_nondangerous_accidents_inside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_nondangerous_accidents_outside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_nondangerous_accidents_killed_inside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_nondangerous_accidents_killed_outside']; ?></th>
                </tr>
                <tr style='color: #000;'>
                    <th>3. Dangerous occurrences involving injuries/deaths.</th>
                    <th><?php echo $singlereturn_data['nonfatal_dangerous_accidents']; ?></th>
                    <th><?php echo $singlereturn_data['nonfatal_dangerous_accidents_inside']; ?></th>
                    <th><?php echo $singlereturn_data['nonfatal_dangerous_accidents_outside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_dangerous_accidents']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_dangerous_accidents_inside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_dangerous_accidents_outside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_dangerous_accidents_killed_inside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_dangerous_accidents_killed_outside']; ?></th>
                </tr>
                <tr style='color: #000;'>
                    <th>4. Major accidents involving injuries/deaths.</th>
                    <th><?php echo $singlereturn_data['nonfatal_major_accidents']; ?></th>
                    <th><?php echo $singlereturn_data['nonfatal_major_accidents_inside']; ?></th>
                    <th><?php echo $singlereturn_data['nonfatal_major_accidents_outside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_major_accidents']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_major_accidents_inside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_major_accidents_outside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_major_accidents_killed_inside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_major_accidents_killed_outside']; ?></th>
                </tr>
                <tr style='color: #000;'>
                    <th>5. Major accidents not involving injuries/deaths.</th>
                    <th><?php echo $singlereturn_data['nonfatal_nonmajor_accidents']; ?></th>
                    <th><?php echo $singlereturn_data['nonfatal_nonmajor_accidents_inside']; ?></th>
                    <th><?php echo $singlereturn_data['nonfatal_nonmajor_accidents_outside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_nonmajor_accidents']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_nonmajor_accidents_inside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_nonmajor_accidents_outside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_nonmajor_accidents_killed_inside']; ?></th>
                    <th><?php echo $singlereturn_data['fatal_nonmajor_accidents_killed_outside']; ?></th>
                </tr>
            </thead>
    </table>
    <table class="CompanyDetails" id="" style="margin-top: 10px;border:1px solid black;">
        <thead>
            <tr style='color: #000;text-align: center;'>
                <th colspan="9">Number of injuries occurring in </th>
            </tr>
            <tr style='color: #000;text-align: center;'>
                <th colspan="3">Hazardous Process under Section 2(b)</th>
                <th colspan="3">Dangerous operations under Section 87  </th>
                <th colspan="3">Others  </th>
            </tr>
            <tr style='color: #000;text-align: center;'>
                <th colspan="3">Number of </th>
                <th colspan="3">Number of </th>
                <th colspan="3">Number of </th>
            </tr>
            <tr style='color: #000;text-align: center;'>
                <th> Accidents </th>
                <th colspan="2">Persons injured  </th>
                <th> Accidents </th>
                <th>Persons injured  </th>
                <th></th>
                <th> Accidents </th>
                <th colspan="2">Persons injured  </th>
            </tr>
            <tr style='color: #000;text-align: center;'>
                <th></th>
                <th>Fatal  </th>
                <th>Nonfatal </th>
                <th></th>
                <th>Fatal  </th>
                <th>Nonfatal </th>
                <th></th>
                <th>Fatal  </th>
                <th>Nonfatal </th>
            </tr>
            <tr style='color: #000;text-align: center;'>
                <th>1</th>
                <th>2 </th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
                <th>9</th>
            </tr>
            <tr style='color: #000;'>
                <th><?php echo $singlereturn_data['hazardous_accidents']; ?></th>
                <th><?php echo $singlereturn_data['hazardous_fatal_injured']; ?></th>
                <th><?php echo $singlereturn_data['hazardous_nonfatal_injured']; ?></th>
                <th><?php echo $singlereturn_data['dangerous_accidents']; ?></th>
                <th><?php echo $singlereturn_data['dangerous_fatal_injured']; ?></th>
                <th><?php echo $singlereturn_data['dangerous_nonfatal_injured']; ?></th>
                <th><?php echo $singlereturn_data['other_accidents']; ?></th>
                <th><?php echo $singlereturn_data['other_fatal_injured']; ?></th>
                <th><?php echo $singlereturn_data['other_nonfatal_injured']; ?></th>
            </tr>
        </thead>
    </table>
    <br/>
    <table class="CompanyDetails">
        <tr>
            <td class="first-column"> </td>
            <td class="second-column"> (i) Nonfatal injuries (workers injured during the Year in which injured workers returned to work During the same year. <br/>(a) Number of injuries :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['no_of_non_fatal_injuries']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column"> (b) Mandays lost due to injuries: :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['no_of_non_fatal_lost_injuries']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column"> (ii) Nonfatal injuries (workers injuries) occurring in : The previous year in which injured workers returned to Work during the year to which this information relates <br/>(a) Number of injuries :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['no_of_return_non_fatal_injuries']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column"> (b) Mandays lost due to injuries: :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['no_of_return_non_fatal_lost_injuries']; ?>
            </td>
        </tr>
    </table>
    <br/>
    <br/>
    <div style="font-size: 14px; text-align: center;font-weight: bold;"><u>Part E </u></div><br/>
    <div style="font-size: 14px;" >Details under The Payment of Wages Act - 1936 & Rules made there under </div><br/>
    <div style="font-size: 14px;" >My establishment is covered under The Payment of Wages Act, 1936 and Rules made there under. All workers/office staff are paid wages as prescribed manner. I have maintained all registers and records as required under the law. </div><br/>
    <table class="CompanyDetails">
        <tr>
            <td class="first-column">1 </td>
            <td class="second-column">Whether application in respect of Fines being Imposed on the employees in sent :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['respect_of_fines']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">2 </td>
            <td class="second-column">(i) Number of Man days worked (i.e. aggregate : Number of attendance) during the year for person Earning more than Rs. 1600/- per month (See explanatory note “D”)<br/>
             (a) Adults :<br/><br/>
             (b) Young Persons Total :
            </td>
            <td class="third-column">
                <?php echo $singlereturn_data['adult_worked_days']; ?><br/><br/>
                <?php echo $singlereturn_data['young_person_worked_days']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(ii) Average number of workers employed daily (i.e. man days worked divided by number of days Worked) for persons earning more than Rs. 1600/ Per month (See explanatory note “B”)<br/>
            (a) Adults :<br/><br/>
            (b) Young Persons Total :
            </td>
            <td class="third-column">
                <?php echo $singlereturn_data['adult_workers_employed']; ?><br/><br/>
                <?php echo $singlereturn_data['young_peson_workers_employed']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">3 </td>
            <td class="second-column"> "Total wages paid" including 'deductions' under Section 7(2) of the Payment of Wages Act, 1936 for persons getting less than Rs. 1600/- per month on the following account: 
            </td>
            <td class="third-column"></td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(a) Basic wages only :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['basic_wages']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(b) Dearness Allowances :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['dearness_allowances']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(c) Composite wage (i.e. if combined Basic wage and dearness allowance paid) :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['composite_wages']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(d) Overtime wages :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['overtime_wages']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(e) Non-profit sharing bonus  :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['nonprofit_bonus']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(f) Any other bonus (other than Profit sharing bonus and non -profit Sharing bonus) forming part of wages As defined under the Act :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['other_bonus']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(g) Any other amount paid in cash which may form part of wages As defined under the Act. (Please specify) :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['other_amount']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(h) Arrears of pat in respects of Pervious year during the year :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['arrears_of_pat']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(i) Total wages paid (Total of (a+b) or c+d+r+f+g+h) :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['total_wages']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">4 </td>
            <td class="second-column"> Gross amount paid as remuneration to person getting less than 1600/- per month including 'deduction' under Section 7(2) of the Act on The following accounts: 
            </td>
            <td class="third-column"></td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column"> (a) Total wages paid (item 3) during the year :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['year_total_wages']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(b) 'Bonus paid' during the year (Including arrears also, if paid During the year. This is statutory Sharing Bonus)  :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['year_paid_bonus']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(c) Amount of money value of Commission' given during the year :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['commision_amount']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column"> </td>
            <td class="second-column">(d) Deductions-number of cases and amount realized :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['realized_amount']; ?>
            </td>
        </tr>
    </table>
    <br/>
    <br/>
    <div style="font-size: 14px; text-align: center;font-weight: bold;"><u>Part F </u></div><br/>
    <div style="font-size: 14px;" >Details under the Maternity Benefit Act-1961 & Rules made there under</div><br/>
     <table class="CompanyDetails">
        <tr>
            <td class="first-column">1 </td>
            <td class="second-column">Number of female workers employed on any day :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['no_of_female_workers']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">2 </td>
            <td class="second-column">No. of women workers, claimed Maternity benefit / No, paid (Section 5)  :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['no_of_maternity_women_workers']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">3 </td>
            <td class="second-column">No. of cases in which medical Bonus is claimed /paid (Section 8) :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['medical_bonus_case']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">4 </td>
            <td class="second-column">No. of cases of leave for miscarriage is applied/granted (Section 9 & 9-A) :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['miscarriage_leave_case']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">5 </td>
            <td class="second-column">Number of cases of additional leave For illness applied / granted (Section 10) :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['additional_leave_case']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">6 </td>
            <td class="second-column">Total amount of maternity benefit paid :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['maternity_benefit_amount']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">7 </td>
            <td class="second-column">Whether Nursing breaks allowed to the eligible women employees? (under Section 11) :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_nursing_breaks'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">8 </td>
            <td class="second-column">Whether women employees are dismissed from service during their pregnancy depriving of their entitled maternity ; benefit or medical bonus -if so, number of women dismissed and reasons thereof (Section 12) :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['no_of_dismissed_women']; ?><br/>
                <?php echo $singlereturn_data['dismissed_reason']; ?>
            </td>
        </tr>
    </table>
    <br/>
    <br/>
    <div style="font-size: 14px; text-align: center;font-weight: bold;"><u>Part G</u></div><br/>
    <div style="font-size: 14px;" >Physically Handicapped persons (Employment in Factories) Act, 1982 and rules made there under</div><br/>
    <div style="font-size: 14px;" >My establishment is covered under The Physically Handicapped Persons (Employment in Factories) Act, 198? and Rules made there under. I have already appointed physically handicapped persons as per law and maintained all registers and records as required under the law. </div><br/>
    <table class="CompanyDetails">
        <tr>
            <td class="first-column">1 </td>
            <td class="second-column">Total No. of workers employed :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['no_of_employed_workers']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">2 </td>
            <td class="second-column">Number of physically handicapped persons employed :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['no_of_handicapped_employed']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">3 </td>
            <td class="second-column">Certificates from Certifying Surgeon obtained from all workers ?  :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_surgeon_obtain'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">4 </td>
            <td class="second-column">Whether all physically handicapped persons are recruited from registered Persons with employment exchange :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_handicapped_recuited'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column">5 </td>
            <td class="second-column">Record of physically handicapped persons maintained in Form No. II. Rule - 3  :</td>
            <td class="third-column">
                <?php echo $singlereturn_data['is_record_physically_handicapped'] == 1 ? 'YES' : 'NO'; ?>
            </td>
        </tr>
    </table>
    <br/><br/>
    <div style="font-size: 14px; text-align: center;font-weight: bold;">Explanatory Note </div><br/>
    <div style="font-size: 14px;" >(A) All such 'dangerous processes or operations' as specified and declared in the Rules farmed under section 87 of the Factories Act, 1948 should be checked. If the factory or even a part of the factory submitted returns falls under this Section.The fact should be mentioned against this item and request information furnished accordingly. </div><br/>
    <div style="font-size: 14px;" >(B) The average number of workers employed daily should be calculated by dividing the figures of 'Mandays worked' by number of days worked in the year. For seasonal factories*, the average number 22! of workers employed daily during the working season and off-season should be given separately. (Refer note B-2) </div><br/>
    <div style="font-size: 14px;" >(C) All such 'hazardous processes in relation to the industries specified in the First Schedule to the Factories Act and defined under Section 2(cb) of the Act should be checked. If a factory, or even a part of the factory submitting returns falls under this Section, the fact should be mentioned against this item and requisite information furnished accordingly. </div><br/>
    <div style="font-size: 14px;" >(D) Mandays worked should be the aggregate number of attendance of all the workers, covered under the Act, in all the working days. In reckoning attendance, attendance by the temporary as well as permanent employed should be counted, and all employees should be included, whether they are employed directly or under contractors (Apprentices, who are not covered under the Apprentices Act, 1961, are also to be included). Attendance on separate shifts (e.g. night and day shifts) should be counted separately. Partial attendance for less than half a shift on a working day should be ignored while attendance for half a shift or more on such day should be treated as full attendance. </div><br/>
</body>
</html>