import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

const PATH = {
  login: 'api/login', // 登陆
};

@Injectable()
export class AuthService {
  JWT_KEY = 'JKY_BJ_AD';
  // store the URL so we can redirect after logging in
  redirectUrl = '';
  @select(['main', 'adminName']) adminName: Observable<string>;
  @select(['main', 'adminId']) adminId: Observable<number>;

  constructor(
    private router: Router,
    @Inject('app') public app,
    @Inject('http') public httpService,
    @Inject('main') public mainAction
  ) {
  }

  setJwt(jwt: string) {
    window.sessionStorage.setItem(this.JWT_KEY, jwt);
  }

  login(creds) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.login}`, creds);
  }

  logout() {
    window.sessionStorage.removeItem(this.JWT_KEY);
    this.router.navigate(['/login']);
    this.redirectUrl = '';
    this.mainAction.delAdmin();
  }

  isAuthorized(): boolean {
    const admin = window.sessionStorage.getItem(this.JWT_KEY);
    if (admin) {
      this.mainAction.setAdmin({id: JSON.parse(admin).id, name: JSON.parse(admin).name});
      this.mainAction.setTree({
        'menuId': '1',
        'menuName': '昌平健康云标准版',
        'children': [
          {
            'menuId': '08f204a024844f29b60ff0e11d39ab8e',
            'menuName': '叶酸领取预约',
            'parentId': '1',
            'href': 'test-test',
            'children': [
              {
                'menuId': '41f290d8c44b4dbaae4179952f90bc31',
                'menuName': '预约信息查询',
                'parentId': '08f204a024844f29b60ff0e11d39ab8e',
                'href': 'test-test',
                'checked': false
              },
              {
                'menuId': 'cc43a371cfa8471ba506d0e33d5d447e',
                'menuName': '排班以及号源维护',
                'parentId': '08f204a024844f29b60ff0e11d39ab8e',
                'href': 'test-test',
                'checked': false
              }
            ],
            'checked': false
          },
          {
            'menuId': '6f23805d6859481fa3298b4a6f080df6',
            'menuName': '系统管理',
            'parentId': '1',
            'href': 'Test-test',
            'children': [
              {
                'menuId': '40a196b09c054f6db0efab7b925fe25b',
                'menuName': '菜单管理',
                'parentId': '6f23805d6859481fa3298b4a6f080df6',
                'href': 'Test-test',
                'checked': false
              }
            ],
            'checked': false
          }
        ],
        'checked': false
      });
      this.mainAction.setNav([
        {
          'menuId': '08f204a024844f29b60ff0e11d39ab8e',
          'menuName': '系统管理',
          'parentId': '1',
          'href': '/',
          'children': [
            {
              'menuId': '41f290d8c44b4dbaae4179952f90bc31',
              'menuName': '菜单管理',
              'parentId': '08f204a024844f29b60ff0e11d39ab8e',
              'href': '/menu',
              'checked': false
            },
            {
              'menuId': 'cc43a371cfa8471ba506d0e33d5d447e',
              'menuName': '医院机构管理',
              'parentId': '08f204a024844f29b60ff0e11d39ab8e',
              'href': '/organization',
              'checked': false
            },
            {
              'menuId': 'cc43a371cfa8471ba506d0e33d5d447e',
              'menuName': '角色管理',
              'parentId': '08f204a024844f29b60ff0e11d39ab8e',
              'href': '/role',
              'checked': false
            },
            {
              'menuId': 'cc43a371cfa8471ba506d0e33d5d447e',
              'menuName': '账号管理',
              'parentId': '08f204a024844f29b60ff0e11d39ab8e',
              'href': '/account',
              'checked': false
            }
          ],
          'checked': false
        },
        {
          'menuId': '08f204a024844f29b60ff0e11d39ab8e',
          'menuName': '叶酸领取预约',
          'parentId': '1',
          'href': '/',
          'children': [
            {
              'menuId': '41f290d8c44b4dbaae4179952f90bc31',
              'menuName': '排号及号源管理',
              'parentId': '08f204a024844f29b60ff0e11d39ab8e',
              'href': '/receive-folic-acid/plan',
              'checked': false
            },
            {
              'menuId': 'cc43a371cfa8471ba506d0e33d5d447e',
              'menuName': '预约信息查询',
              'parentId': '08f204a024844f29b60ff0e11d39ab8e',
              'href': '/receive-folic-acid/appointment',
              'checked': false
            }
          ],
          'checked': false
        },
        {
          'menuId': '08f204a024844f29b60ff0e11d39ab8e',
          'menuName': '母子建档预约',
          'parentId': '1',
          'href': '/',
          'children': [
            {
              'menuId': '41f290d8c44b4dbaae4179952f90bc31',
              'menuName': '排号及号源管理',
              'parentId': '08f204a024844f29b60ff0e11d39ab8e',
              'href': '/mac-database/plan',
              'checked': false
            },
            {
              'menuId': 'cc43a371cfa8471ba506d0e33d5d447e',
              'menuName': '预约信息查询',
              'parentId': '08f204a024844f29b60ff0e11d39ab8e',
              'href': '/mac-database/appointment',
              'checked': false
            }
          ],
          'checked': false
        },
        {
          'menuId': '08f204a024844f29b60ff0e11d39ab8e',
          'menuName': '计划免疫预约',
          'parentId': '1',
          'href': '/',
          'children': [
            {
              'menuId': '41f290d8c44b4dbaae4179952f90bc31',
              'menuName': '排号及号源管理',
              'parentId': '08f204a024844f29b60ff0e11d39ab8e',
              'href': '/planned-immunity/plan',
              'checked': false
            },
            {
              'menuId': 'cc43a371cfa8471ba506d0e33d5d447e',
              'menuName': '预约信息查询',
              'parentId': '08f204a024844f29b60ff0e11d39ab8e',
              'href': '/planned-immunity/appointment',
              'checked': false
            }
          ],
          'checked': false
        },
        {
          'menuId': '08f204a024844f29b60ff0e11d39ab8e',
          'menuName': '儿童体检预约',
          'parentId': '1',
          'href': '/',
          'children': [
            {
              'menuId': '41f290d8c44b4dbaae4179952f90bc31',
              'menuName': '排号及号源管理',
              'parentId': '08f204a024844f29b60ff0e11d39ab8e',
              'href': '/pe-for-children/plan',
              'checked': false
            },
            {
              'menuId': 'cc43a371cfa8471ba506d0e33d5d447e',
              'menuName': '医院机构管理',
              'parentId': '预约信息查询',
              'href': '/pe-for-children/appointment',
              'checked': false
            }
          ],
          'checked': false
        },
        {
          'menuId': '6f23805d6859481fa3298b4a6f080df6',
          'menuName': '资讯管理',
          'parentId': '1',
          'href': '/',
          'children': [
            {
              'menuId': '41f290d8c44b4dbaae4179952f90bc31',
              'menuName': '文章库',
              'parentId': '08f204a024844f29b60ff0e11d39ab8e',
              'href': '/article',
              'checked': false
            },
            {
              'menuId': 'cc43a371cfa8471ba506d0e33d5d447e',
              'menuName': '资讯分类',
              'parentId': '08f204a024844f29b60ff0e11d39ab8e',
              'href': '/article-classify',
              'checked': false
            }
          ],
          'checked': false
        },
        {
          'menuId': '6f23805d6859481fa3298b4a6f080df6',
          'menuName': '广告管理',
          'parentId': '1',
          'href': '/',
          'children': [
            {
              'menuId': '41f290d8c44b4dbaae4179952f90bc31',
              'menuName': 'banner设置',
              'parentId': '08f204a024844f29b60ff0e11d39ab8e',
              'href': '/banner',
              'checked': false
            }
          ],
          'checked': false
        },
        {
          'menuId': '6f23805d6859481fa3298b4a6f080df6',
          'menuName': '消息',
          'parentId': '1',
          'href': '/message',
          'children': [],
          'checked': false
        },
        {
          'menuId': '6f23805d6859481fa3298b4a6f080df6',
          'menuName': '建议反馈',
          'parentId': '1',
          'href': '/feedback',
          'children': [],
          'checked': false
        }
      ]);
    }
    return Boolean(admin);
  }

  getAdminName(): string {
    let name: string;
    this.adminName.subscribe(res => {
      name = res;
    });
    return name;
  }

  getAdminId(): number {
    let id: number;
    this.adminId.subscribe(res => {
      id = res;
    });
    return id;
  }
}
