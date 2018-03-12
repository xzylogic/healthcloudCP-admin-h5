import { Component } from '@angular/core';

@Component({
  selector: 'app-dtree-example',
  template: `
    <app-dtree [trees]="treeList"
               (HandleUpdate)="updateEmit($event)"
               (HandleCreate)="createEmit($event)"
    ></app-dtree>
  `
})
export class DTreeExampleComponent {
  treeList: any = [{
    'menuId': '1',
    'menuName': '健康云标准版',
    'type': '1',
    'children': [
      {
        'menuId': '05f9b342b6064159b207bf7aaa81b158',
        'menuName': '首页设置',
        'parentId': '1',
        'type': '1',
        'children': [
          {
            'menuId': '1d470eff750643a8bfd0e67442ec14d6',
            'menuName': '广告页设置',
            'parentId': '05f9b342b6064159b207bf7aaa81b158',
            'href': 'app.advertisementSetting',
            'type': '1',
            'checked': false
          },
          {
            'menuId': '225ef8af439b461abf2f10bf605f2525',
            'menuName': '服务板块设置',
            'parentId': '05f9b342b6064159b207bf7aaa81b158',
            'href': 'app.serviceManage',
            'type': '1',
            'checked': false
          },
          {
            'menuId': '2361bd89226c4b0487b44864dd27591c',
            'menuName': '广告位广告设置',
            'parentId': '05f9b342b6064159b207bf7aaa81b158',
            'href': 'app.advertisementPositionSetting',
            'type': '1',
            'checked': false
          },
          {
            'menuId': '9cd68589cc50403c8bc55220b47acf69',
            'menuName': '首页板块设置',
            'parentId': '05f9b342b6064159b207bf7aaa81b158',
            'href': 'app.homeSetting',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'a127f7454d3247bba42bc27807a7b932',
            'menuName': 'Banner设置',
            'parentId': '05f9b342b6064159b207bf7aaa81b158',
            'href': 'app.bannerSetting',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'e18bd2a124c5460b92fc5e57402f3567',
            'menuName': '首页资讯',
            'parentId': '05f9b342b6064159b207bf7aaa81b158',
            'href': 'app.information',
            'type': '1',
            'checked': false
          }
        ],
        'checked': false
      },
      {
        'menuId': '10bc299fc08c416d8e4144e636d1f662',
        'menuName': 'APP基础设置',
        'parentId': '1',
        'type': '1',
        'children': [
          {
            'menuId': '6e4fbd084c514166b45aab087f0cc706',
            'menuName': 'APP升级',
            'parentId': '10bc299fc08c416d8e4144e636d1f662',
            'href': 'app.appUpgradeList',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'ac31caed19e94962a9f4f77d67051142',
            'menuName': '广州底部Tab设置',
            'parentId': '10bc299fc08c416d8e4144e636d1f662',
            'href': 'app.appTabGuangzhou',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'b8ae964a2f1348eb93c7822df12efea3',
            'menuName': 'APP零散设置',
            'parentId': '10bc299fc08c416d8e4144e636d1f662',
            'href': 'app.appConfList',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'e8abe160c5e140d1b1fb58aa407ffb15',
            'menuName': 'APP关于',
            'parentId': '10bc299fc08c416d8e4144e636d1f662',
            'href': 'app.appAboutList',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'f9667e26557e415d800ac41db6507141',
            'menuName': 'IOS升级',
            'parentId': '10bc299fc08c416d8e4144e636d1f662',
            'href': 'app.iosUpgradeList',
            'type': '1',
            'checked': false
          }
        ],
        'checked': false
      },
      {
        'menuId': '1fea7c3e0af440d5b9d5f692ec4b0a25',
        'menuName': '食物库',
        'parentId': '1',
        'type': '1',
        'children': [
          {
            'menuId': '4ec7f852cafa464eb758ba6f4b0f3f9e',
            'menuName': '食物库分类',
            'parentId': '1fea7c3e0af440d5b9d5f692ec4b0a25',
            'href': 'app.foodClassList',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'bcd7b7515d0949939cc52ad646a70847',
            'menuName': '食物库',
            'parentId': '1fea7c3e0af440d5b9d5f692ec4b0a25',
            'href': 'app.foodList',
            'type': '1',
            'checked': false
          }
        ],
        'checked': false
      },
      {
        'menuId': '466f6ad5b8c442aba93398880c25d180',
        'menuName': '活动',
        'parentId': '1',
        'type': '1',
        'children': [
          {
            'menuId': '93f0199f87a64dd79720b16f844eac74',
            'menuName': '活动奖品',
            'parentId': '466f6ad5b8c442aba93398880c25d180',
            'href': 'app.activityPrize',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'f1666e2b2fd04270aaa2efe7830d2612',
            'menuName': '活动列表',
            'parentId': '466f6ad5b8c442aba93398880c25d180',
            'href': 'app.activityList',
            'type': '1',
            'checked': false
          }
        ],
        'checked': false
      },
      {
        'menuId': '4a99fd3055ff4a41bfbebaa4e3f85a8e',
        'menuName': 'CMS用户管理',
        'parentId': '1',
        'href': 'app.userManage',
        'type': '1',
        'checked': false
      },
      {
        'menuId': '6541f89123e14b299ab68dbfbbc8f2d1',
        'menuName': '居民监测方案',
        'parentId': '1',
        'href': 'app.pictureManage',
        'type': '1',
        'checked': false
      },
      {
        'menuId': '66634edb84b5465b93384b4b7bc2ba2b',
        'menuName': '系统管理',
        'parentId': '1',
        'type': '1',
        'children': [
          {
            'menuId': '3495d2c6186c4f568d8ce4dcc3a34aa4',
            'menuName': '角色管理',
            'parentId': '66634edb84b5465b93384b4b7bc2ba2b',
            'href': 'app.roleManage',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'aa72e9abf1424e5886fa1b786977b57f',
            'menuName': '账号管理',
            'parentId': '66634edb84b5465b93384b4b7bc2ba2b',
            'href': 'app.accountManage',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'c36fca84a9854d599f676c1d79680c87',
            'menuName': '菜单管理',
            'parentId': '66634edb84b5465b93384b4b7bc2ba2b',
            'href': 'app.menuManage',
            'type': '1',
            'checked': false
          }
        ],
        'checked': false
      },
      {
        'menuId': '67354a9ff86143c8836ee8fae63bb3c2',
        'menuName': '商城管理',
        'parentId': '1',
        'type': '1',
        'children': [
          {
            'menuId': '2fdb0e85835144d1b369b32486d8821b',
            'menuName': '兑换信息',
            'parentId': '67354a9ff86143c8836ee8fae63bb3c2',
            'href': 'app.exchange',
            'type': '1',
            'checked': false
          },
          {
            'menuId': '524a19ff4670425e941ec80f0b51ea1b',
            'menuName': '前台配置',
            'parentId': '67354a9ff86143c8836ee8fae63bb3c2',
            'type': '1',
            'children': [
              {
                'menuId': 'f77b5b4231cf4e73954f87ad3fbe343e',
                'menuName': '首页Banner配置',
                'parentId': '524a19ff4670425e941ec80f0b51ea1b',
                'href': 'app.front.bannerlist',
                'type': '1',
                'checked': false
              }
            ],
            'checked': false
          },
          {
            'menuId': 'bc2f203302d8422483545a3fe07a7ee1',
            'menuName': '商品信息',
            'parentId': '67354a9ff86143c8836ee8fae63bb3c2',
            'href': 'app.commodityInformation',
            'type': '1',
            'checked': false
          }
        ],
        'checked': false
      },
      {
        'menuId': '7ed51924a180472aa37af82b810f8d83',
        'menuName': '用户数据统计',
        'parentId': '1',
        'type': '1',
        'children': [
          {
            'menuId': '466bd541f4a54f71875fcbc291553cf3',
            'menuName': '累计数据统计',
            'parentId': '7ed51924a180472aa37af82b810f8d83',
            'href': 'app.leijiDataTotal',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'efcb8620a1fb42489a335aef22198b83',
            'menuName': '每日数据统计',
            'parentId': '7ed51924a180472aa37af82b810f8d83',
            'href': 'app.dayDataTotal',
            'type': '1',
            'checked': false
          }
        ],
        'checked': false
      },
      {
        'menuId': '8aeea3fbc437472c990495a265de4fdd',
        'menuName': '预约挂号管理',
        'parentId': '1',
        'type': '1',
        'children': [
          {
            'menuId': '013f194415244e768f99bb7c07817082',
            'menuName': '挂号医院管理',
            'parentId': '8aeea3fbc437472c990495a265de4fdd',
            'href': 'app.hospitalManage',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'a99fb5fd2f2748fc81f2fe54f6240e34',
            'menuName': '挂号订单管理',
            'parentId': '8aeea3fbc437472c990495a265de4fdd',
            'href': 'app.orderManage',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'b1dc8f5ea2a84badb18c4fb8eba00f31',
            'menuName': '预约挂号配置',
            'parentId': '8aeea3fbc437472c990495a265de4fdd',
            'href': 'app.apponitConf',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'e1f320cbff55475e819faf3b217a4508',
            'menuName': '挂号医生管理',
            'parentId': '8aeea3fbc437472c990495a265de4fdd',
            'href': 'app.doctorManage',
            'type': '1',
            'checked': false
          }
        ],
        'checked': false
      },
      {
        'menuId': '9b67f072e3944424ab9ad2384688b009',
        'menuName': '计步活动规则',
        'parentId': '1',
        'href': 'app.stepRule',
        'type': '1',
        'checked': false
      },
      {
        'menuId': '9c8dfdaef28043b49906615aaf7f53f3',
        'menuName': '4.0特有功能',
        'parentId': '1',
        'type': '1',
        'children': [
          {
            'menuId': '0250f3463105427a82d2fe0ab17942d0',
            'menuName': '安全认证例外列表',
            'parentId': '9c8dfdaef28043b49906615aaf7f53f3',
            'href': 'app.exceptionList',
            'type': '1',
            'checked': false
          },
          {
            'menuId': '53aeea37f3b841509b5bbca9c9fadb80',
            'menuName': '底部Tab设置',
            'parentId': '9c8dfdaef28043b49906615aaf7f53f3',
            'href': 'app.appTab',
            'type': '1',
            'checked': false
          },
          {
            'menuId': '7077922ed78440a7acd767154416db8d',
            'menuName': '特色服务版块设置',
            'parentId': '9c8dfdaef28043b49906615aaf7f53f3',
            'href': 'app.specialServiceSetting',
            'type': '1',
            'checked': false
          },
          {
            'menuId': '75d2926ee29e492897688fa6f766fd39',
            'menuName': '首页云头条管理',
            'parentId': '9c8dfdaef28043b49906615aaf7f53f3',
            'href': 'app.cloudTop',
            'type': '1',
            'checked': false
          },
          {
            'menuId': '8b849f98cc7d4a729a2fe8b031923251',
            'menuName': '分享链接配置',
            'parentId': '9c8dfdaef28043b49906615aaf7f53f3',
            'href': 'app.shareSetting',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'a32867f09ecf454c8a65e5c59bc61df9',
            'menuName': '客服设置',
            'parentId': '9c8dfdaef28043b49906615aaf7f53f3',
            'href': 'app.customerSetting',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'b936341910e74cb2827a1214821abc34',
            'menuName': '首页模块入口管理',
            'parentId': '9c8dfdaef28043b49906615aaf7f53f3',
            'href': 'app.modulePortal',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'be53e6ac98e24ee5b6fab046c8a42724',
            'menuName': '免费测量点管理',
            'parentId': '9c8dfdaef28043b49906615aaf7f53f3',
            'type': '1',
            'children': [
              {
                'menuId': '84927f96bee643248f9e7086130c602c',
                'menuName': '设备管理',
                'parentId': 'be53e6ac98e24ee5b6fab046c8a42724',
                'href': 'app.devicemanage',
                'type': '1',
                'checked': false
              },
              {
                'menuId': 'b8a63ef841a149bd9b80fa59e6624324',
                'menuName': '测量点管理',
                'parentId': 'be53e6ac98e24ee5b6fab046c8a42724',
                'href': 'app.measurepoint',
                'type': '1',
                'checked': false
              }
            ],
            'checked': false
          },
          {
            'menuId': 'c74af6e9ee8b492787b4310cef6c3f3f',
            'menuName': '广告位广告设置',
            'parentId': '9c8dfdaef28043b49906615aaf7f53f3',
            'href': 'app.homeadadd',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'd6de0192f63046d2b8a7c6a6aa294fb7',
            'menuName': '首页版块设置',
            'parentId': '9c8dfdaef28043b49906615aaf7f53f3',
            'href': 'app.homeSetting_3',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'dae11bb02fc64004b3971e4b5345a5b0',
            'menuName': '首页热门话题管理',
            'parentId': '9c8dfdaef28043b49906615aaf7f53f3',
            'href': 'app.hotTopic',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'e47a80adc8684c49b81ee3a5e627ff88',
            'menuName': '服务版块设置',
            'parentId': '9c8dfdaef28043b49906615aaf7f53f3',
            'href': 'app.serviceManage',
            'type': '1',
            'checked': false
          }
        ],
        'checked': false
      },
      {
        'menuId': 'b486e9407cf448d4a23c67317369156d',
        'menuName': '问答',
        'parentId': '1',
        'href': 'app.QandAList',
        'type': '1',
        'checked': false
      },
      {
        'menuId': 'b91d6b6d56b242f987c537fef3145215',
        'menuName': '地推邀请码配置',
        'parentId': '1',
        'href': 'app.promptConfig',
        'type': '1',
        'checked': false
      },
      {
        'menuId': 'c4a7ae98c0524fb28c8ba70345bb3e82',
        'menuName': '健康圈',
        'parentId': '1',
        'href': 'app.coterieManage',
        'type': '1',
        'children': [
          {
            'menuId': '2b93939d51d640e38fb2ee2f04f03522',
            'menuName': '敏感词汇',
            'parentId': 'c4a7ae98c0524fb28c8ba70345bb3e82',
            'href': 'app.sensitiveWords',
            'type': '1',
            'checked': false
          },
          {
            'menuId': '86d01a066b9b4d45b8bc4d968229b686',
            'menuName': '话题分类',
            'parentId': 'c4a7ae98c0524fb28c8ba70345bb3e82',
            'href': 'app.subjectType',
            'type': '1',
            'checked': false
          },
          {
            'menuId': '927ec4e1c22f48f991736a490400c506',
            'menuName': 'Banner设置',
            'parentId': 'c4a7ae98c0524fb28c8ba70345bb3e82',
            'href': 'app.coterieBannerSetting',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'a0ae329002ce4b1483bd2c096cdd73a4',
            'menuName': '评论列表',
            'parentId': 'c4a7ae98c0524fb28c8ba70345bb3e82',
            'href': 'app.comment',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'b33211e605e64e4781023054a18d99c2',
            'menuName': '圈子分类',
            'parentId': 'c4a7ae98c0524fb28c8ba70345bb3e82',
            'href': 'app.coterieClassifyList',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'bc60a6d2c6584b3cb6caa5eb0f666e0c',
            'menuName': '话题列表',
            'parentId': 'c4a7ae98c0524fb28c8ba70345bb3e82',
            'href': 'app.uncheckSubject',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'c6db20f1e5b54edeb9e3cb13d2e42a13',
            'menuName': '圈子管理',
            'parentId': 'c4a7ae98c0524fb28c8ba70345bb3e82',
            'href': 'app.coterieManageList',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'f4632653be254ec5822d7a28fd0f788d',
            'menuName': '用户管理',
            'parentId': 'c4a7ae98c0524fb28c8ba70345bb3e82',
            'href': 'app.coterieUserManage',
            'type': '1',
            'checked': false
          }
        ],
        'checked': false
      },
      {
        'menuId': 'd7ccc6bc292142b9be28842491936895',
        'menuName': '推送管理',
        'parentId': '1',
        'type': '1',
        'children': [
          {
            'menuId': '14949b9e8b1e401da596396c80d5c5ea',
            'menuName': '话题推送',
            'parentId': 'd7ccc6bc292142b9be28842491936895',
            'href': 'app.subjectPushManage',
            'type': '1',
            'children': [
              {
                'menuId': '274f000fa25f46d1bbfaa30cc55e540e',
                'menuName': '审核',
                'parentId': '14949b9e8b1e401da596396c80d5c5ea',
                'type': '2',
                'checked': false
              }
            ],
            'checked': false
          },
          {
            'menuId': 'd8492b8dc9ae42fca7f3a1ea6d1ade67',
            'menuName': '资讯推送',
            'parentId': 'd7ccc6bc292142b9be28842491936895',
            'href': 'app.push',
            'type': '1',
            'children': [
              {
                'menuId': '07c4ec7fd4f34f68b1d6603fd9232aee',
                'menuName': '审核',
                'parentId': 'd8492b8dc9ae42fca7f3a1ea6d1ade67',
                'type': '2',
                'checked': false
              }
            ],
            'checked': false
          }
        ],
        'checked': false
      },
      {
        'menuId': 'd92a1d3032314ceba7a6fb64af4040b7',
        'menuName': '帮助中心',
        'parentId': '1',
        'href': 'app.helpQuestionList',
        'type': '1',
        'checked': false
      },
      {
        'menuId': 'e0f783a3d1e34ae5b16d65223cd8f452',
        'menuName': '全程接种',
        'parentId': '1',
        'type': '1',
        'children': [
          {
            'menuId': '016fb5b03b1a4a6ead8a6c7d24ac7ed1',
            'menuName': '接种点管理',
            'parentId': 'e0f783a3d1e34ae5b16d65223cd8f452',
            'href': 'app.vaccine.adress',
            'type': '1',
            'checked': false
          },
          {
            'menuId': '2bdce90c5f8a48dc9017fda3010e5e36',
            'menuName': '首页服务配置',
            'parentId': 'e0f783a3d1e34ae5b16d65223cd8f452',
            'href': 'app.vaccine.indexServiceConfig',
            'type': '1',
            'checked': false
          },
          {
            'menuId': '8f0dd3dc98874131af11eb66974c0287',
            'menuName': '疫苗管理',
            'parentId': 'e0f783a3d1e34ae5b16d65223cd8f452',
            'href': 'app.vaccine.vaccine',
            'type': '1',
            'checked': false
          },
          {
            'menuId': '94cfdf5cf3244fbc96573272f700bdf8',
            'menuName': '月龄管理',
            'parentId': 'e0f783a3d1e34ae5b16d65223cd8f452',
            'href': 'app.vaccine.moonAge',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'b22d5b4e85984bf394e3cb498bd1a954',
            'menuName': '预约管理',
            'parentId': 'e0f783a3d1e34ae5b16d65223cd8f452',
            'href': 'app.vaccine.appointment',
            'type': '1',
            'checked': false
          },
          {
            'menuId': 'c10fa1d16cf54820bc8071fdb0268f0b',
            'menuName': '预约规则文案',
            'parentId': 'e0f783a3d1e34ae5b16d65223cd8f452',
            'href': 'app.vaccine.orderRulerText',
            'type': '1',
            'checked': false,
            'children': [
              {
                'menuId': '2559a8938efa406ab516d2f40fc35c2b',
                'menuName': '文章库',
                'parentId': 'f109e6966a2244b6ba12fcd48e4c14e7',
                'href': 'app.article',
                'type': '1',
                'checked': false,
                'children': [
                  {
                    'menuId': '2559a8938efa406ab516d2f40fc35c2b',
                    'menuName': '文章库',
                    'parentId': 'f109e6966a2244b6ba12fcd48e4c14e7',
                    'href': 'app.article',
                    'type': '1',
                    'checked': false
                  },
                  {
                    'menuId': '68a0a652e0614196bd3f717796ea69dd',
                    'menuName': '资讯分类',
                    'parentId': 'f109e6966a2244b6ba12fcd48e4c14e7',
                    'href': 'app.classification',
                    'type': '1',
                    'checked': false
                  }
                ],
              },
              {
                'menuId': '68a0a652e0614196bd3f717796ea69dd',
                'menuName': '资讯分类',
                'parentId': 'f109e6966a2244b6ba12fcd48e4c14e7',
                'href': 'app.classification',
                'type': '1',
                'checked': false,
                'children': [
                  {
                    'menuId': '2559a8938efa406ab516d2f40fc35c2b',
                    'menuName': '文章库',
                    'parentId': 'f109e6966a2244b6ba12fcd48e4c14e7',
                    'href': 'app.article',
                    'type': '1',
                    'checked': false
                  },
                  {
                    'menuId': '68a0a652e0614196bd3f717796ea69dd',
                    'menuName': '资讯分类',
                    'parentId': 'f109e6966a2244b6ba12fcd48e4c14e7',
                    'href': 'app.classification',
                    'type': '1',
                    'checked': false
                  }
                ],
              }
            ],
          },
          {
            'menuId': 'd689862f0a964b7983db79ebf8f0b57b',
            'menuName': '特殊短信配置',
            'parentId': 'e0f783a3d1e34ae5b16d65223cd8f452',
            'href': 'app.vaccine.specialMessageConfig',
            'type': '1',
            'checked': false
          }
        ],
        'checked': false
      },
      {
        'menuId': 'f109e6966a2244b6ba12fcd48e4c14e7',
        'menuName': '文章管理',
        'parentId': '1',
        'type': '1',
        'children': [
          {
            'menuId': '2559a8938efa406ab516d2f40fc35c2b',
            'menuName': '文章库',
            'parentId': 'f109e6966a2244b6ba12fcd48e4c14e7',
            'href': 'app.article',
            'type': '1',
            'checked': false,
            'children': [
              {
                'menuId': '016fb5b03b1a4a6ead8a6c7d24ac7ed1',
                'menuName': '接种点管理',
                'parentId': 'e0f783a3d1e34ae5b16d65223cd8f452',
                'href': 'app.vaccine.adress',
                'type': '1',
                'checked': false
              },
              {
                'menuId': '2bdce90c5f8a48dc9017fda3010e5e36',
                'menuName': '首页服务配置',
                'parentId': 'e0f783a3d1e34ae5b16d65223cd8f452',
                'href': 'app.vaccine.indexServiceConfig',
                'type': '1',
                'checked': false
              },
              {
                'menuId': '8f0dd3dc98874131af11eb66974c0287',
                'menuName': '疫苗管理',
                'parentId': 'e0f783a3d1e34ae5b16d65223cd8f452',
                'href': 'app.vaccine.vaccine',
                'type': '1',
                'checked': false
              },
              {
                'menuId': '94cfdf5cf3244fbc96573272f700bdf8',
                'menuName': '月龄管理',
                'parentId': 'e0f783a3d1e34ae5b16d65223cd8f452',
                'href': 'app.vaccine.moonAge',
                'type': '1',
                'checked': false
              },
              {
                'menuId': 'b22d5b4e85984bf394e3cb498bd1a954',
                'menuName': '预约管理',
                'parentId': 'e0f783a3d1e34ae5b16d65223cd8f452',
                'href': 'app.vaccine.appointment',
                'type': '1',
                'checked': false
              },
              {
                'menuId': 'c10fa1d16cf54820bc8071fdb0268f0b',
                'menuName': '预约规则文案',
                'parentId': 'e0f783a3d1e34ae5b16d65223cd8f452',
                'href': 'app.vaccine.orderRulerText',
                'type': '1',
                'checked': false,
                'children': [
                  {
                    'menuId': '2559a8938efa406ab516d2f40fc35c2b',
                    'menuName': '文章库',
                    'parentId': 'f109e6966a2244b6ba12fcd48e4c14e7',
                    'href': 'app.article',
                    'type': '1',
                    'checked': false,
                    'children': [
                      {
                        'menuId': '2559a8938efa406ab516d2f40fc35c2b',
                        'menuName': '文章库',
                        'parentId': 'f109e6966a2244b6ba12fcd48e4c14e7',
                        'href': 'app.article',
                        'type': '1',
                        'checked': false
                      },
                      {
                        'menuId': '68a0a652e0614196bd3f717796ea69dd',
                        'menuName': '资讯分类',
                        'parentId': 'f109e6966a2244b6ba12fcd48e4c14e7',
                        'href': 'app.classification',
                        'type': '1',
                        'checked': false
                      }
                    ],
                  },
                  {
                    'menuId': '68a0a652e0614196bd3f717796ea69dd',
                    'menuName': '资讯分类',
                    'parentId': 'f109e6966a2244b6ba12fcd48e4c14e7',
                    'href': 'app.classification',
                    'type': '1',
                    'checked': false,
                    'children': [
                      {
                        'menuId': '2559a8938efa406ab516d2f40fc35c2b',
                        'menuName': '文章库',
                        'parentId': 'f109e6966a2244b6ba12fcd48e4c14e7',
                        'href': 'app.article',
                        'type': '1',
                        'checked': false
                      },
                      {
                        'menuId': '68a0a652e0614196bd3f717796ea69dd',
                        'menuName': '资讯分类',
                        'parentId': 'f109e6966a2244b6ba12fcd48e4c14e7',
                        'href': 'app.classification',
                        'type': '1',
                        'checked': false
                      }
                    ],
                  }
                ],
              },
              {
                'menuId': 'd689862f0a964b7983db79ebf8f0b57b',
                'menuName': '特殊短信配置',
                'parentId': 'e0f783a3d1e34ae5b16d65223cd8f452',
                'href': 'app.vaccine.specialMessageConfig',
                'type': '1',
                'checked': false
              }
            ],
          },
          {
            'menuId': '68a0a652e0614196bd3f717796ea69dd',
            'menuName': '资讯分类',
            'parentId': 'f109e6966a2244b6ba12fcd48e4c14e7',
            'href': 'app.classification',
            'type': '1',
            'checked': false
          }
        ],
        'checked': false
      }
    ],
    'checked': false
  }];

  constructor() {
  }

  createEmit(data) {
    console.log(data);
  }

  updateEmit(data) {
    console.log(data);
  }
}
