import React, {useState} from 'react';
import logo from './logo.svg';
import './app.css';
import styled, {css} from 'styled-components';
import IconLeftArrow from './icons/IconLeftArrow';
import IconRightArrow from './icons/IconRightArrow';

const SearchWidget = styled.div`
    width: 100%;
    height: 200px;
    background: #fff;
    border-radius: 0 .5rem .5rem .5rem;
    box-shadow: 0 4px 16px 0 rgba(39,36,44,.16);
    display: flex;
    align-items: center;
    justify-content: center;
`
const DatePickerWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
`
const DateField = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 50px;
    padding: 0 16px;
    border: solid 1px #ddd;
    max-width: 300px;
    cursor: pointer;
`
const DatePicker = styled.div`
    display: block;
    position: absolute;
    background: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    width: 664px;
    box-shadow: 0 2px 8px 0 rgba(39,38,44,.2);
    z-index: 99;
    top: -20px;
    right: -20px;
    padding: 16px;
    transition: opacity .2s,transform .2s;
    transition-timing-function: ease;
    visibility: visible;
    transform: scale(1,1);
    transform-origin: top left;
    opacity: 1;
    transform-origin: top right;
`
const Backdrop = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 1;
`
const Top = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`
const Clear = styled.button`
    border-width: 0;
    border-radius: 4px;
    width: 70px;
    height: 48px;
    font-family: inherit;
    font-size: 15px;
    color: #44b50c;
    cursor: pointer;
    outline: 0;
    background: 0 0;
`
const Dates = styled.div`
    width: 400px;
    display: flex;
`
const DateWrap = styled.div`
    flex: 1;
    position: relative;
    height: 50px;
    background-color: #fff;
    border: solid 1px #e5e3e8;
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 1.6rem;
    color: #666;
    ${props=>props.depart && css`
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    `}
    ${props=>props.return && css`
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    `}
    ${props=>props.active && css`
        border: solid 2px #55c901;
    `}
`
const Arrows = styled.div`
    height: 40px;
    position: absolute;
    left: 0;
    right: 0;
    direction: ltr;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    justify-content: space-between;
    svg{
        width: 7px;
    }
`
const LeftArrow = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    align-items:center;
    justify-content: center;
    cursor: pointer;
`
const RightArrow = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    align-items:center;
    justify-content: center;
    cursor: pointer;
`
const Calendars = styled.div`
    display: flex;
    justify-content: space-between;
`
const Calendar = styled.div`
    width: 50%;
    max-width: 296px;
`
const Month = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 500;
    height: 40px;
`
const DayLabels = styled.div`
    display: flex;
    align-items: center;
`
const DayLabel = styled.div`
    color: #828086;
    font-size: 14px;
    font-weight: 400;
    height: 16px;
    margin: 0 12px 0 0;
    padding: 8px 0;
    text-align: center;
    width: 32px;
    &:nth-of-type(7) {
        color: rgba(0,0,0,.85);
        margin: 0;
    }
`
const Days = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const Day = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    width: 32px;
    line-height: 30px;
    text-align: center;
    font-size: 15px;
    font-style: normal;
    cursor: pointer;
    margin-bottom: 12px;
    margin-right: 12px;
    border-radius: 4px;
    &:nth-of-type(7n){
        margin-right: 0;
    }
    &:hover{
        background: #e7fddc;
    }
    ${props=>props.empty && css`
        pointer-events: none;
    `}
`
const HolidayHeader = styled.div`
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 12px;
    color: #828086;
    padding: 4px 0 3px;
    text-transform: uppercase;
`
const Holidays = styled.div`
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
`
const Holiday = styled.div`
    height: 20px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: 400;
    margin: 5px 5px 0 0;
    background-color: #f8f8f8;
`
const HolidayDate = styled.div`
    color: #cc061b;
`
const HolidayName = styled.div`
    color: #999;
    margin-left: 5px;
`

function App() {
    const [showPicker, setShowPicker] = useState(false);
    const togglePicker = () => {
        setShowPicker(prevState => !prevState);
    }
    return (
        <div className="App">
            <SearchWidget>
                <DatePickerWrap>
                    <DateField onClick={togglePicker} />
                    {showPicker &&
                        <>
                            <DatePicker>
                                <Top>
                                    <Clear>
                                        Clear
                                    </Clear>
                                    <Dates>
                                        <DateWrap depart active>
                                            Depart
                                        </DateWrap>
                                        <DateWrap return>
                                            Return
                                        </DateWrap>
                                    </Dates>
                                </Top>
                                <Arrows>
                                    <LeftArrow>
                                        <IconLeftArrow />
                                    </LeftArrow>
                                    <RightArrow>
                                        <IconRightArrow />
                                    </RightArrow>
                                </Arrows>
                                <Calendars>
                                    <Calendar>
                                        <Month>
                                            January 2020
                                        </Month>
                                        <DayLabels>
                                            <DayLabel key="0">Mon</DayLabel>
                                            <DayLabel key="1">Tue</DayLabel>
                                            <DayLabel key="2">Wed</DayLabel>
                                            <DayLabel key="3">Thu</DayLabel>
                                            <DayLabel key="4">Fri</DayLabel>
                                            <DayLabel key="5">Sat</DayLabel>
                                            <DayLabel key="6">Sun</DayLabel>
                                        </DayLabels>
                                        <Days>
                                            <Day empty></Day>
                                            <Day empty></Day>
                                            <Day empty></Day>
                                            <Day empty></Day>
                                            <Day>1</Day>
                                            <Day>2</Day>
                                            <Day>3</Day>
                                            <Day>4</Day>
                                            <Day>5</Day>
                                            <Day>6</Day>
                                            <Day>7</Day>
                                            <Day>8</Day>
                                            <Day>9</Day>
                                            <Day>10</Day>
                                            <Day>11</Day>
                                            <Day>12</Day>
                                            <Day>13</Day>
                                            <Day>14</Day>
                                            <Day>15</Day>
                                            <Day>16</Day>
                                            <Day>17</Day>
                                            <Day>18</Day>
                                            <Day>19</Day>
                                            <Day>20</Day>
                                            <Day>21</Day>
                                            <Day>22</Day>
                                            <Day>23</Day>
                                            <Day>24</Day>
                                            <Day>25</Day>
                                            <Day>26</Day>
                                            <Day>27</Day>
                                            <Day>28</Day>
                                            <Day>29</Day>
                                            <Day>30</Day>
                                            <Day>31</Day>
                                        </Days>
                                    </Calendar>

                                    <Calendar>
                                        <Month>
                                            January 2020
                                        </Month>
                                        <DayLabels>
                                            <DayLabel key="0">Mon</DayLabel>
                                            <DayLabel key="1">Tue</DayLabel>
                                            <DayLabel key="2">Wed</DayLabel>
                                            <DayLabel key="3">Thu</DayLabel>
                                            <DayLabel key="4">Fri</DayLabel>
                                            <DayLabel key="5">Sat</DayLabel>
                                            <DayLabel key="6">Sun</DayLabel>
                                        </DayLabels>
                                        <Days>
                                            <Day empty></Day>
                                            <Day empty></Day>
                                            <Day empty></Day>
                                            <Day empty></Day>
                                            <Day>1</Day>
                                            <Day>2</Day>
                                            <Day>3</Day>
                                            <Day>4</Day>
                                            <Day>5</Day>
                                            <Day>6</Day>
                                            <Day>7</Day>
                                            <Day>8</Day>
                                            <Day>9</Day>
                                            <Day>10</Day>
                                            <Day>11</Day>
                                            <Day>12</Day>
                                            <Day>13</Day>
                                            <Day>14</Day>
                                            <Day>15</Day>
                                            <Day>16</Day>
                                            <Day>17</Day>
                                            <Day>18</Day>
                                            <Day>19</Day>
                                            <Day>20</Day>
                                            <Day>21</Day>
                                            <Day>22</Day>
                                            <Day>23</Day>
                                            <Day>24</Day>
                                            <Day>25</Day>
                                            <Day>26</Day>
                                            <Day>27</Day>
                                            <Day>28</Day>
                                            <Day>29</Day>
                                            <Day>30</Day>
                                            <Day>31</Day>
                                        </Days>
                                    </Calendar>
                                </Calendars>
                                <HolidayHeader>
                                    *Public Holidays
                                </HolidayHeader>
                                <Holidays>
                                    <Holiday>
                                        <HolidayDate>
                                            25 Dec
                                        </HolidayDate>
                                        <HolidayName>
                                            Christmas
                                        </HolidayName>
                                    </Holiday>

                                    <Holiday>
                                        <HolidayDate>
                                            1 Jan
                                        </HolidayDate>
                                        <HolidayName>
                                            New Year
                                        </HolidayName>
                                    </Holiday>
                                </Holidays>
                            </DatePicker>
                            <Backdrop onClick={togglePicker} />
                        </>
                    }
                </DatePickerWrap>
            </SearchWidget>
        </div>
    );
}

export default App;
