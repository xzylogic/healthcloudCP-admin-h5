import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-welcome',
  template: `
    <div class="welcome-container">
      <div class=welcome></div>
      <!--<div #charts style="width: 600px;height:400px;"></div>-->
    </div>
  `,
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  @ViewChild('charts') charts: any;

  constructor(@Inject('app') public app) {
  }

  ngOnInit() {
    console.log(this.charts);
    // 基于准备好的dom，初始化echarts实例
    // const myChart = echarts.init(this.charts.nativeElement);
    // 指定图表的配置项和数据
    // const option = {
    //   tooltip: {
    //     trigger: 'item',
    //     formatter: '{a} <br/>{b}: {c} ({d}%)'
    //   },
    //   legend: {
    //     orient: 'vertical',
    //     x: 'left',
    //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    //   },
    //   series: [
    //     {
    //       name: '访问来源',
    //       type: 'pie',
    //       radius: ['50%', '70%'],
    //       avoidLabelOverlap: false,
    //       label: {
    //         normal: {
    //           show: false,
    //           position: 'center'
    //         },
    //         emphasis: {
    //           show: true,
    //           textStyle: {
    //             fontSize: '30',
    //             fontWeight: 'bold'
    //           }
    //         }
    //       },
    //       labelLine: {
    //         normal: {
    //           show: false
    //         }
    //       },
    //       data: [
    //         {value: 335, name: '直接访问'},
    //         {value: 310, name: '邮件营销'},
    //         {value: 234, name: '联盟广告'},
    //         {value: 135, name: '视频广告'},
    //         {value: 1548, name: '搜索引擎'}
    //       ]
    //     }
    //   ]
    // };

    // 使用刚指定的配置项和数据显示图表。
    // myChart.setOption(option);
  }
}
