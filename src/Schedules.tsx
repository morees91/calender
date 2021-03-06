import React from 'react';
import moment from 'moment';


export interface Props {


}


export interface State {
    month: Array<string>,
    year: number
    monthIndex: number,
    dayName: Array<string>,
    DaysnMonth: number
    dateObject: any,
    daysinmonth: any,
    Rows: Array<any>,
    calender: Array<any>,
    cells: Array<any>,
    StartofMonth: any,
    EndofMonth: any

}







class Schedules extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            StartofMonth: "",
            EndofMonth: "",
            calender: [],
            cells: [],
            Rows: [],
            daysinmonth: [],
            dateObject: moment(),
            dayName: moment().localeData().weekdays(),
            month: moment().localeData().months(),
            year: moment().get("year"),
            monthIndex: moment().get("month"),
            DaysnMonth: 0,





        };
    }


    componentDidUpdate() {


    }

    componentDidMount() {


        this.cal()
        //this.EndDays();  



    }


    EndDays = () => {


        console.log('testing ')

        //כמות הימים בחודש של לפני
        var DaysnMonth = moment(this.state.year + '-' + moment().month(this.state.month[this.state.monthIndex - 1]).format("MM"), "YYYY-MM").daysInMonth();



        //מספר היום שמתחיל החודש הזה
        var ChoosesMonthFirstDay = moment()
            .month(this.state.month[this.state.monthIndex])
            .date(1).hours(0).minutes(0).seconds(0).milliseconds(0).format('d');

        console.log(this.state.month[this.state.monthIndex])
        console.log(this.state.monthIndex)



        var lastDaysMonth = DaysnMonth - parseInt(ChoosesMonthFirstDay) + 1

        // console.log(DaysnMonth)
        console.log(ChoosesMonthFirstDay)
        // console.log(lastDaysMonth)
        // console.log(monthEndDay)
        // console.log(endDay)
        console.log(this.state.monthIndex)




        for (var e = lastDaysMonth; e < DaysnMonth + 1; e++) {


            this.state.cells.push(
                <p style={{color:'silver'}}>{e}</p>
            )


        }

        this.setState({
            cells: this.state.cells

        })

        console.log(this.state.cells)


    }

    DaysOFMonth = (DaysnMonth: number) => {


    var currentMonth = moment().get("month");

    console.log(currentMonth)

        for (var r = 1; r < DaysnMonth + 1; r++) {


            this.state.cells.push(r)

            if (r == parseInt(moment().format("D")) && currentMonth==this.state.monthIndex) {

                console.log(r)
                this.state.cells.splice(r + 1, 1, <div style={{ border: "solid 1px red" }}>{parseInt(moment().format("D"))}</div>)

            }



        }


    }

    FirstDays = (dateObject: any, endDay: string) => {


        var monthEndDay = moment().month(this.state.month[this.state.monthIndex]).date(1).hours(0).minutes(0).seconds(0).milliseconds(0).format('d');

        var endDayToNumber = parseInt(endDay)
        console.log(endDayToNumber)

        for (var n = parseInt(monthEndDay); n < 7 - parseInt(monthEndDay); n++) {
            console.log(n)



            this.state.cells.push(   <p style={{color:'silver'}}>{n}</p>)

        }




    }

    cal = () => {

        var DaysnMonth = moment(this.state.year + '-' + moment().month(this.state.month[this.state.monthIndex]).format("MM"), "YYYY-MM").daysInMonth();

        let dateObject = this.state.dateObject;

        let endDay = moment(dateObject)
            .endOf("month")
            .format("d");

        this.EndDays()
        this.DaysOFMonth(DaysnMonth)
        this.FirstDays(dateObject, endDay)

    }




    NextMonth = () => {


        this.state.cells.length = 0


        this.state.monthIndex == 11 ?
            this.setState({
                monthIndex: 0,
                year: this.state.year + 1,
                DaysnMonth: moment(this.state.year + '-' + moment().month(this.state.month[this.state.monthIndex]).format("MM"), "YYYY-MM").daysInMonth(),

            })

            :
            this.setState({
                cells: this.state.cells,
                monthIndex: this.state.monthIndex + 1,
                DaysnMonth: moment(this.state.year + '-' + moment().month(this.state.month[this.state.monthIndex]).format("MM"), "YYYY-MM").daysInMonth(),

            });




        this.cal()


    }



    LastMonth = () => {

        this.state.cells.length = 0

        this.state.monthIndex === 0 ?

            this.setState({

                monthIndex: 11,
                year: this.state.year - 1,
                DaysnMonth: moment(this.state.year + '-' + moment().month(this.state.month[this.state.monthIndex]).format("MM"), "YYYY-MM").daysInMonth()


            }) :

            this.setState({

                monthIndex: this.state.monthIndex - 1,
                DaysnMonth: moment(this.state.year + '-' + moment().month(this.state.month[this.state.monthIndex]).format("MM"), "YYYY-MM").daysInMonth()


            })


        this.cal()
    }








    render() {

        return (
            <div className="row container-fluid">

                        <div className="col-md-12">
                        <div className="row">
                                <div className="col-md"><i className='fas fa-angle-left' style={{ fontSize: 36 }} onClick={() => this.LastMonth()}></i></div>
                                <div className="col-md"><h3>{this.state.month[this.state.monthIndex]} {this.state.year}</h3> </div>
                                <div className="col-md"><i className='fas fa-angle-right' style={{ fontSize: 36 }} onClick={() => this.NextMonth()}></i></div>

                            </div>


                            <div className="d-flex align-content-center flex-wrap">

                                {
                                    this.state.dayName.map(days =>

                                        <div key={days}   style={{ border: 'solid black 1px', width: "140px" }}>{days}</div>


                                    )

                                }
                            </div>


                            <div className='calender  d-flex align-content-center flex-wrap'>
                              
                              {
                                  this.state.cells.map((cell,index) =>
                                  
                                  <div   className={`text ${this.state.month[this.state.monthIndex]}`} style={{border:"solid 1px black",padding:"55px",width:"140px"}}>{cell}</div>)
                                  
                                  
                              }

                                </div>
                                     
 
                        
 


                        </div>

                    </div>

        );
    }
}

export default Schedules;