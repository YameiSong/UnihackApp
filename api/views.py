from urllib import request
from django.shortcuts import render, redirect
from .forms import UserForm
from .models import TravelPlan, Tag
from django.http import HttpResponse


# Create your views here.


@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('dashboard.html')
    else:
        form = UserForm()
    return render(request, 'login.html', {'form': form})



到达时间  2个tag name和其真实地址
2个调用地址 获取地址对应的id
全部存到travelplan数据库
@api_view(['POST'])
def calendar(request):
    arrival_time = request.POST.get('arrival_time')
    depart_address = request.POST.get('depart_address')
    depart_id = api(depart_address)
    arrive_address = request.session.get('arrive_address')
    arrive_id = api(arrive_address)
    depart_tag_name = api(depart_address)
    selected_date = request.POST.get('selected_date')
    event_name = request.POST.get('event_name')
    arrive_tag_name = request.session.get('arrive_tag_name')
    transport_mode = request.POST.get('transport_mode')
    travel_plan = TravelPlan.objects.create(user = request.user,date = selected_date, event_name= event_name,expected_arrival_time= arrival_time, departure_address= depart_tag_name,arrival_address= arrive_tag_name,transport_mode= transport_mode)
    travel_plan.save()
    return redirect('success')

别名 和 地址传入数据库
@api_view(['POST'])
def tag(request):
    arrive_address = request.POST.get('arrive_address')
    user = request.user
    arrive_tag_name = request.POST.get('arrive_tag_name')
    request.session['arrive_tag_name'] = 'arrive_tag_name'
    request.session['arrive_address'] = 'arrive_address'
    Tag.objects.create(user=user, tag_name=arrive_tag_name, address=arrive_address)
    Tag.save()
    return HttpResponse('dashboard.html')


monitor：
筛选今天的plan
2个ID和到达时间里面调用时间api
更新到达时间
def monitor(request):
