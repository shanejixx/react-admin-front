const menuList = [
  {
    title: '后台首页', 
    key: '/admin/home', 
    icon: 'home', 
    isPublic: true, 
  },
  {
    title: '文章管理',
    key: '/admin/posts',
    icon: 'appstore'
  },
  {
    title: '栏目管理',
    key: '/admin/categories',
    icon: 'bars'
  },
  {
    title: '标签管理',
    key: '/admin/tags',
    icon: 'tags'
  },
  {
    title: '用户管理',
    key: '/admin/users',
    icon: 'user'
  },
  {
    title: '角色管理',
    key: '/admin/roles',
    icon: 'safety',
  },

  {
    title: '图形图表',
    key: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: '柱形图',
        key: '/admin/charts/bar',
        icon: 'bar-chart'
      },
      {
        title: '折线图',
        key: '/admin/charts/line',
        icon: 'line-chart'
      },
      {
        title: '饼图',
        key: '/admin/charts/pie',
        icon: 'pie-chart'
      },
    ]
  },

  {
    title: '关于我的',
    key: '/admin/aboutme',
    icon: 'smile',
  },
]

export default menuList