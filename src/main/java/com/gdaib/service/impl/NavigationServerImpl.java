package com.gdaib.service.impl;

import com.gdaib.mapper.NavigationExtMapper;
import com.gdaib.mapper.NavigationMapper;
import com.gdaib.pojo.*;
import com.gdaib.service.NavigationServer;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by mahanzhen on 17-5-18.
 */
public class NavigationServerImpl implements NavigationServer {

    public static final String QUERY_NAV_ACTION = "/content/ajaxFindExtNavByParent.action";
    public static final String QUERY_FILE_TITLE_ACTION = "/content/ajaxFindFileInfoByNavId.action";


    public static final Integer EXTEND = 1;
    public static final Integer UN_EXTEND = 0;


    @Autowired
    NavigationExtMapper navigationExtMapper;

    @Autowired
    public NavigationMapper navigationMapper;


//    @Override
//    public Integer insertNavigation(Navigation navigation) throws Exception {
//
//        Integer insertResult = navigationExtMapper.insert(navigation);
//
//        Navigation upNav = new Navigation();
//        upNav.setParent(navigation.getParent());
//        upNav.setExtend(EXTEND);
////        upNav.setUrl(QUERY_NAV_ACTION);
//        updateNavByParent(upNav);
//
//        return insertResult;
//    }

//    @Override
//    public Integer deleteNavByPrimaryKey(int id) throws Exception {
//
//        Navigation navigation = navigationExtMapper.selectByPrimaryKey(id);
//
//        int result = navigationExtMapper.deleteByPrimaryKey(id);
//
//        if (navigation != null) {
//            int ifExtend = selectCountByParent(navigation.getParent());
//            System.out.println("ifExtemd = " + ifExtend);
//            if (ifExtend == UN_EXTEND) {
//                Navigation upNavigation = new Navigation();
//                upNavigation.setParent(navigation.getParent());
////                upNavigation.setUrl(QUERY_FILE_TITLE_ACTION);
//                upNavigation.setExtend(UN_EXTEND);
//                updateNavByParent(upNavigation);
//            }
//
//        }
//
//
//        return result;
//    }

//    public Integer updateNavByParent(Navigation navigation) throws Exception {
//        System.out.println(navigation.toString());
//
//        NavigationExample example = new NavigationExample();
//        NavigationExample.Criteria criteria = example.createCriteria();
//        criteria.andIdEqualTo(navigation.getParent());
//
//        navigation.setParent(null);
//
//        int result = navigationExtMapper.updateByExampleSelective(navigation, example);
//
//        return result;
//    }

//    @Override
//    public int updateNavByPrimaryKey(int navigationId, String title) throws Exception {
//        Navigation navigation = new Navigation();
//        navigation.setTitle(title);
//        navigation.setId(navigationId);
//
//
//        NavigationExample example = new NavigationExample();
//        NavigationExample.Criteria criteria = example.createCriteria();
//        criteria.andIdEqualTo(navigationId);
//
//        navigation.setParent(null);
//
//        int result = navigationExtMapper.updateByExampleSelective(navigation, example);
//
//        return result;
//
//    }
//
//    @Override
//    public Integer selectCountByParent(Integer parent) throws Exception {
//
//        NavigationExample example = new NavigationExample();
//        NavigationExample.Criteria criteria = example.createCriteria();
//        criteria.andParentEqualTo(parent);
//        Integer count = navigationExtMapper.countByExample(example);
//        return count;
//    }
//
//    @Override
//    public List<Navigation> selectNecByDepartIdAndParent(Integer departmentId, Integer parent) throws Exception {
//
//        NavigationExample navigationExample = new NavigationExample();
//        NavigationExample.Criteria criteria = navigationExample.createCriteria();
//        criteria.andDepartmentidEqualTo(departmentId);
//        criteria.andParentEqualTo(parent);
//        List<Navigation> navigations = navigationExtMapper.selectByExample(navigationExample);
//
//
//        List<Navigation> myNavigations = new ArrayList<Navigation>();
//        NavUrlPojo navUrlPojo;
//        FileInfoUrlPojo fileInfoUrlPojo;
//        for (Navigation navigation : navigations) {
//
//            navUrlPojo = new NavUrlPojo();
//            fileInfoUrlPojo = new FileInfoUrlPojo();
//
//            if (navigation.getExtend() == EXTEND) {
//
//                navUrlPojo.setAction(QUERY_NAV_ACTION);
//                navUrlPojo.setDepartmentId(navigation.getDepartmentid());
//                navUrlPojo.setParent(navigation.getId());
//
//                navigation.setUrl(navUrlPojo.toString());
//            } else if (navigation.getExtend() == UN_EXTEND) {
//
//                fileInfoUrlPojo.setAction(QUERY_FILE_TITLE_ACTION);
//                fileInfoUrlPojo.setNavigationId(navigation.getId());
//                navigation.setUrl(fileInfoUrlPojo.toString());
//            }
//
//            myNavigations.add(navigation);
//        }
//
//
//        return navigations;
//    }
//
//
//    @Override
//    public List<Navigation> selectNecByDepartId(Integer departmentId) throws Exception {
//        List<Navigation> navigations;
//        NavigationExample example = new NavigationExample();
//        NavigationExample.Criteria criteria = example.createCriteria();
//        criteria.andDepartmentidEqualTo(departmentId);
//        navigations = navigationExtMapper.selectByExample(example);
//
//
//        return navigations;
//    }
//
//    /**
//     * 根据系id,一级导航id找到剩下的所有导航
//     */
//    public List<NavigationCustom> getChildNav(Integer DepartmentId, Integer ParentId) {
//
//        //根据两个参数查找对应的子导航
//        NavigationExample navigationExample = new NavigationExample();
//        NavigationExample.Criteria criteria = navigationExample.createCriteria();
//        criteria.andDepartmentidEqualTo(DepartmentId);
//        criteria.andParentEqualTo(ParentId);
//
//        List<Navigation> navigations = navigationMapper.selectByExample(navigationExample);
//
//        //转换为NavigationCustom的list
//        List<NavigationCustom> navigationCustoms = toCustom(navigations);
//
//        List<NavigationCustom> childNavigationCustoms = new ArrayList<NavigationCustom>();
//
//        //遍历导航，查找出是否存在子导航
//        for (NavigationCustom navigationCustom : navigationCustoms) {
//            //如果有子导航
//            if (navigationCustom.getUrl() == null || navigationCustom.getUrl().equals("")) {
//                //传入系Id和父导航id
//                List<NavigationCustom> childNav = getChildNav(DepartmentId, navigationCustom.getId());
//                navigationCustom.setChiren(childNav);
//
//                childNavigationCustoms.add(navigationCustom);
//
//            } else {//如果没有子导航
//
//                //给url赋值地址
//                String url = navigationCustom.getUrl();
//                FileInfoUrlPojo fileInfoUrlPojo = new FileInfoUrlPojo();
//                fileInfoUrlPojo.setAction(QUERY_FILE_TITLE_ACTION);
//                fileInfoUrlPojo.setNavigationId(navigationCustom.getId());
//
//                navigationCustom.setUrl(fileInfoUrlPojo.toString());
//                //加入list中
//                childNavigationCustoms.add(navigationCustom);
//            }
//
//        }


//        return childNavigationCustoms;
//
//    }

    //把List中的父类的属性复制到子类
    private List<NavigationCustom> toCustom(List<Navigation> navigations) {
        List<NavigationCustom> navigationCustoms = new ArrayList<NavigationCustom>();
        for (Navigation navigation : navigations) {
            NavigationCustom navigationCustom = new NavigationCustom();
            //将父类转换为子类
            fatherToChild(navigation, navigationCustom);

            navigationCustoms.add(navigationCustom);
        }

        return navigationCustoms;

    }

    //反射方法，将父类转换为子类
    public static void fatherToChild(Object father, Object child) {
        if (!(child.getClass().getSuperclass() == father.getClass())) {
            System.err.println("child不是father的子类");
        }
        Class fatherClass = father.getClass();
        Field ff[] = fatherClass.getDeclaredFields();
        for (int i = 0; i < ff.length; i++) {
            Field f = ff[i];//取出每一个属性，如deleteDate
            Class type = f.getType();
            try {
                Method m = fatherClass.getMethod("get" + upperHeadChar(f.getName()));//方法getDeleteDate
                f.setAccessible(true);
                Object obj = m.invoke(father);//取出属性值
                f.set(child, obj);
            } catch (SecurityException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (IllegalArgumentException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }

    /**
     * 首字母大写，in:deleteDate，out:DeleteDate
     */
    public static String upperHeadChar(String in) {
        String head = in.substring(0, 1);
        String out = head.toUpperCase() + in.substring(1, in.length());
        return out;
    }


}
