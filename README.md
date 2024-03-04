# README

## Inspiration

Imagine preparing to head to the train station, only to check your map app and discover that your train is delayed by a staggering 30 minutes. Even if you sprint at full speed to the station, the odds of arriving on time for work or school are slim.

In our bustling city, frequent delays in trains and light rails have become all too common, and many people like you and me can’t remember to check transport timetables in advance, causing significant inconvenience and frustration for us.

## What it does

Our primary objective is to alleviate commuter stress by offering a comprehensive solution that addresses the challenges associated with public transportation delays and the forgetfulness of checking timetables in advance. To achieve this, we propose the development of an intuitive web application designed to keep users informed about public transportation timetables while allowing them to plan their future travel seamlessly.

## Challenges we ran into

The most challenging part is how to complete our idea. We want to make it different from a calendar app or a map app. So only providing schedule settings and real-time transport timetable is not enough. After brainstorming and with the help of our mentor, we think we can add two key features: 

1. considering extra time for people to walk to the train station when calculating optimal travel routes, especially for those who use a wheelchair.
2. provide a function for users to broadcast their riding-sharing request when they are not able to arrive at their destination on time by public transport.

## What's next for Commute Ease

In the future, we plan to implement seamless integration with popular Uber and DiDi in our riding-sharing service. By forging partnerships with these industry leaders, commuters will gain access to a wider network of drivers and vehicles, further enhancing the efficiency and convenience of our ride-sharing feature. This will also make taxi rides more affordable for commuters, further enhancing the accessibility and cost-effectiveness of transportation alternatives during unexpected delays or disruptions. In our current system, the frontend queries the backend at fixed intervals for real-time route and ride-sharing updates. However, in the next version, we are exploring the implementation of polling mechanisms to listen for route update events and ride-sharing requests in real-time.
