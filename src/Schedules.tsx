import React from 'react';
import moment from 'moment';


export interface Props {


}


export interface State {
    month: Array<string>,
    year: number
    monthIndex: number,
    dayName: Array<string>,
    DaysnMonth: number,
    dateObject: any,
    daysinmonth: number,
    cells: Array<any>,

}







class Schedules extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            month: moment().localeData().months(),
            year: moment().get("year"),
            monthIndex: moment().get("month"),
            dayName: moment().localeData().weekdays(),
            DaysnMonth:0,
            dateObject: moment(),
            daysinmonth: 0,
            cells: []





        };
    }

    componentDidMount() {


        this.calender()


    }


    EndDays = (colums: Array<any>, DaysnMonth: number, ChoosesMonthFirstDay: string) => {

     

        var lastDaysMonth = DaysnMonth - parseInt(ChoosesMonthFirstDay) + 1



        for (var e = lastDaysMonth; e < DaysnMonth + 1; e++) {

            colums.push(<td key={e} style={{ color: "silver"}}>{e}</td>)

        }

   



    }

    DaysOFMonth = (colums: Array<any>, DaysnMonth: number) => {



        var currentMonth = moment().get("month");

console.log("DaysnMonth",DaysnMonth)


        for (var r = 1; r < DaysnMonth + 1; r++) {


            colums.push(<td key={r}>{r}</td>)

            if (r === parseInt(moment().format("D")) && currentMonth === this.state.monthIndex) {

                console.log(r)
                colums[r] = <td key={colums[r]} style={{backgroundColor:"aliceblue"}}>{r}</td>

            }



        }

    }

    FirstDays = (colums: Array<any>, endDay: string) => {


        var length = 42-colums.length;



        for (var n = 1; n < length+1; n++) {


            colums.push(<td key={n} style={{color: "silver"}}>{n}</td>)

        }



    }


    calender = () => {


        var colums: Array<any> = []



        var DaysnLastMonth = moment(this.state.year + '-' + moment().month(this.state.month[this.state.monthIndex - 1]).format("MM"), "YYYY-MM").daysInMonth();
        var DaysnMonth = moment(this.state.year + '-' + moment().month(this.state.month[this.state.monthIndex]).format("MM"), "YYYY-MM").daysInMonth();
        var endDay = moment(this.state.dateObject).endOf("month").format("d");

        var ChoosesMonthFirstDay = moment().month(this.state.month[this.state.monthIndex]).date(1).hours(0).minutes(0).seconds(0).milliseconds(0).format('d');



        this.setState({
            daysinmonth: DaysnMonth
        });



        this.EndDays(colums, DaysnLastMonth, ChoosesMonthFirstDay);
        this.DaysOFMonth(colums, DaysnMonth);
        this.FirstDays(colums, endDay);

        console.log("colums length",colums.length)

        var setcell = 0
        var setlength = 7

        this.sortCalender(setlength, setcell, colums);

        while (setlength !== 42) {

            setcell += 7
            setlength += 7

            this.sortCalender(setlength, setcell, colums);

        }



    }


    sortCalender = (length: number, setcell: number, colums: Array<any>) => {



        var c = []
        for (var cell = setcell; cell < length; cell++) {


            c.push(colums[cell])


        }


        this.state.cells.push(<tr key={length}>{c}</tr>)

        




    }


    NextMonth = () => {
        var list = this.state.cells
       var index = this.state.monthIndex;

     list.length = 0;

        

        if (this.state.monthIndex !==11) {


            index+=1

            this.setState({
                cells: this.state.cells,
                monthIndex: index,
                DaysnMonth: this.state.daysinmonth,
 },()=>{

this.calender();

 });
           

        } else {

            this.setState({
                monthIndex: 0,
                year: this.state.year + 1,
                DaysnMonth: this.state.daysinmonth,

            },()=>{

this.calender();

            })

               }

    }



    LastMonth = () => {
        var lastList=this.state.cells;

        lastList.length=0;

    

        this.state.monthIndex === 0 ?

            this.setState({

                monthIndex: 11,
                year: this.state.year - 1,
                DaysnMonth: moment(this.state.year + '-' + moment().month(this.state.month[this.state.monthIndex]).format("MM"), "YYYY-MM").daysInMonth()


            },()=>{

                this.calender();

            }) :

            this.setState({

                monthIndex: this.state.monthIndex - 1,
                DaysnMonth: moment(this.state.year + '-' + moment().month(this.state.month[this.state.monthIndex]).format("MM"), "YYYY-MM").daysInMonth()


            },()=>{


                this.calender();
            });


    }








    render() {

        return (
            <div className="row">

                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md"><i className='fas fa-angle-left' style={{ fontSize: 36 }} onClick={() => this.LastMonth()}></i></div>
                        <div className="col-md"><h3 className="current_month">{this.state.month[this.state.monthIndex]} {this.state.year}</h3> </div>
                        <div className="col-md"><i className='fas fa-angle-right' style={{ fontSize: 36 }} onClick={() => this.NextMonth()}></i></div>

                    </div>

                    <div className="container">
                        <div className="row">

                            <table className='table table-bordered'>

                                <thead>

                                    <tr>

                                        {
                                            this.state.dayName.map(days =>

                                                <th key={days} scope='col'>{days}</th>


                                            )

                                        }

                                    </tr>

                                </thead>

                                <tbody>


                                    {
                                        this.state.cells

                                    }



                                </tbody>


                            </table>

                        </div>


                    </div>

                

                </div>

            </div>

        );
    }
}

export default Schedules;