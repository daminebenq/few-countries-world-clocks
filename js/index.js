window.addEventListener('load', function(e){

    const secondHand = document.querySelectorAll('.second-hand');
    const minsHand = document.querySelectorAll('.min-hand');
    
    function setDate() {
      const now = new Date();
      
      const seconds = now.getSeconds();
      const secondsDegrees = ((seconds / 60) * 360) + 90;
      const mins = now.getMinutes();
      const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;

      secondHand.forEach(hand => hand.style.transform = `rotate(${secondsDegrees}deg)`);
      minsHand.forEach(hand => hand.style.transform = `rotate(${minsDegrees}deg)`);

      const  localTimeValue = now.getTime();
      const localOffsetByTimezone = now.getTimezoneOffset()*60*1000;
      const utcTimeValue = localTimeValue + localOffsetByTimezone;

      //TimeZones     
      const timeZonesList =
      [{name: "elsalvador", offset: -6},
       {name: "newyork", offset: -4},
       {name: "brasilia", offset: -3},
       {name: "buenosareas", offset: -3},
       {name: "sonora", offset: -7}
      ]

      timeZonesList.forEach(timeZone => {
          const destinationOffsetValue  = timeZone.offset;
          const destinationTimeValue = utcTimeValue + (3600000*destinationOffsetValue);
          const destinationDateValue = new Date(destinationTimeValue);
          const hour = destinationDateValue.getHours();
          const min = destinationDateValue.getMinutes();
          const hourDegrees = ((hour / 12) * 360) + ((min/60)*30) + 90;

          document.querySelector('.hand.'+ timeZone.name).style.transform = `rotate(${hourDegrees}deg)`;
      })
    }
    
    setInterval(setDate, 1000);
    setDate();
})
